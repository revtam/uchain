pragma solidity >=0.8.7 <=0.8.17;

import "./Controller.sol";
import "../helpers/ArrayOperations.sol";
import "../helpers/GradeOperations.sol";
import "../datatypes/CourseDataTypes.sol";
import "./helpers/ControllerCommonChecks.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/AssessmentDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";

contract CourseController is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    /**
     * @param courseContent The object contains the array of GradeLevels which specify the grading percentage levels and
     * their associated grade: 4 grade levels are expected starting from the first passing grade to the best grade,
     * and the percentages should be defined with 2 decimal digits precision, e.g. 32% = 3200, 51,65% = 5165.
     * If the provided course has the value 0 for its registration and deregistration start and deadlines, it is
     * interpreted as if the course does not have a registration period and can be registered to anytime.
     */
    function createNewCourse(
        CourseDataTypes.CourseContent calldata courseContent,
        CourseDataTypes.AssessmentContent[] calldata assessmentContents,
        uint256[] calldata lecturerUIds,
        uint256[] calldata studyProgramIds
    ) external onlyLecturer {
        // validation
        for (uint256 i = 0; i < lecturerUIds.length; ++i) {
            require(
                userDataManager().getUserRoleAtUId(lecturerUIds[i]) == UserDataTypes.UserRole.LECTURER,
                "Provided lecturer is not registered as lecturer"
            );
        }
        require(
            courseContent.gradeLevels.length == 4,
            "4 grade levels must be specified, starting from the first positive grade"
        );
        for (uint256 i = 0; i < courseContent.gradeLevels.length; ++i) {
            require(
                GradeOperations.isFirstBetterGrade(
                    courseContent.gradeLevels[i].grade,
                    Constants.WORST_GRADE
                ) &&
                    !GradeOperations.isFirstBetterGrade(
                        courseContent.gradeLevels[i].grade,
                        Constants.BEST_GRADE
                    ),
                "Provided grade is out of the grade limmits"
            );
        }

        // action
        uint256 createdCourseId = courseDataManager().createCourse(courseContent);
        courseDataManager().addLecturers(createdCourseId, lecturerUIds);
        courseDataManager().addStudyPrograms(createdCourseId, studyProgramIds);
        assessmentDataManager().createAssessments(createdCourseId, assessmentContents);
    }

    /**
     * @notice Study program managers can add students to courses even after registration deadline,
     * with participant places full or if the study program doesn't allow it normally.
     */
    function addStudentToCourse(uint256 courseId, uint256 studentUId) external onlySPM {
        // validation
        ControllerCommonChecks.requireUserAtUIdStudent(studentUId, userDataManager());

        // action
        registerStudentToCourse(courseId, studentUId);
    }

    /**
     * @notice Study program managers can remove students from courses even after deregistration deadline.
     */
    function removeStudentFromCourse(uint256 courseId, uint256 studentUId) external onlySPM {
        deregisterStudentFromCourse(courseId, studentUId);
    }

    function registerToCourse(uint256 courseId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256[] memory studyProgramIds = courseDataManager().getStudyProgramIdsOfCourse(courseId);
        uint256[] memory enrolledProgramIds = userDataManager().getEnrolledProgramIds(studentUId);
        bool isEnrolled = false;
        for (uint256 i = 0; i < studyProgramIds.length; ++i) {
            isEnrolled = ArrayOperations.isElementInUintArray(studyProgramIds[i], enrolledProgramIds);
            if (isEnrolled) break;
        }
        require(isEnrolled, "Student is not enrolled in the study program this course is available at");
        string[] memory requirementCourseCodes = courseDataManager().getRequirementCourseCodesOfCourse(
            courseId
        );
        for (uint256 i = 0; i < requirementCourseCodes.length; ++i) {
            uint256[] memory courseIdsToCourseCode = courseDataManager().getCourseIdsToCourseCode(
                requirementCourseCodes[i]
            );
            bool isRequirementFilled = false;
            for (uint256 j = 0; j < courseIdsToCourseCode.length; ++j) {
                if (
                    GradeOperations.isGradePositive(
                        performanceDataManager().getGrade(studentUId, courseIdsToCourseCode[j])
                    )
                ) {
                    isRequirementFilled = true;
                    break;
                }
            }
            require(
                isRequirementFilled,
                string(abi.encodePacked("Requirement course is not filled: ", requirementCourseCodes[i]))
            );
        }
        (uint256 regStart, uint256 regEnd) = courseDataManager().getCourseRegistrationPeriod(courseId);
        require(
            regStart == 0 || (block.timestamp >= regStart && block.timestamp <= regEnd),
            "Course registration is not possible at the time"
        );
        require(
            courseDataManager().getCourseParticipantIds(courseId).length <
                courseDataManager().getCourseMaxPlaces(courseId),
            "Course has reached its maximum participants"
        );

        // action
        registerStudentToCourse(courseId, studentUId);
    }

    function deregisterFromCourse(uint256 courseId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        (uint256 deregStart, uint256 deregEnd) = courseDataManager().getCourseDeregistrationPeriod(courseId);
        require(
            deregStart == 0 || (block.timestamp >= deregStart && block.timestamp <= deregEnd),
            "Course deregistration is not possible at the time"
        );
        // action
        deregisterStudentFromCourse(courseId, studentUId);
    }

    function registerToAssessment(uint256 assessmentId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        require(
            !assessmentDataManager().isRegisteredToAssessment(studentUId, assessmentId),
            "Student has already registered to this assessment"
        );
        (uint256 regStart, uint256 regEnd) = assessmentDataManager().getAssessmentRegistrationPeriod(
            assessmentId
        );
        require(
            block.timestamp >= regStart && block.timestamp <= regEnd,
            "Assessment registration is not possible at the time"
        );

        // action
        assessmentDataManager().addRegistrantToAssessment(assessmentId, studentUId);
    }

    function deregisterFromAssessment(uint256 assessmentId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        require(
            assessmentDataManager().isRegisteredToAssessment(studentUId, assessmentId),
            "Student has never registered to this assessment"
        );
        (uint256 deregStart, uint256 deregEnd) = assessmentDataManager().getAssessmentDeregistrationPeriod(
            assessmentId
        );
        require(
            block.timestamp >= deregStart && block.timestamp <= deregEnd,
            "Assessment deregistration is not possible at the time"
        );

        // action
        assessmentDataManager().removeRegistrantFromAssessment(assessmentId, studentUId);
    }

    // PRIVATE FUNCTIONS

    function registerStudentToCourse(uint256 courseId, uint256 studentUId) private {
        // validation
        require(
            !ArrayOperations.isElementInUintArray(
                studentUId,
                courseDataManager().getCourseParticipantIds(courseId)
            ),
            "Student is already registered to the course"
        );

        // action
        courseDataManager().addParticipantToCourse(courseId, studentUId);
        // register student to the course's assessments that don't require extra registration, meaning
        // the student must be registered to them by default
        uint256[] memory assessmentIds = assessmentDataManager().getAssessmentIdsToCourseId(courseId);
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (!assessmentDataManager().isAssessmentRegistrationRequired(assessmentIds[i])) {
                assessmentDataManager().addRegistrantToAssessment(assessmentIds[i], studentUId);
            }
        }
    }

    function deregisterStudentFromCourse(uint256 courseId, uint256 studentUId) private {
        // validation
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        // action
        // user performance data connected to this course is not deleted, so even after the user deregistered from the course,
        // the performance data is restored
        courseDataManager().removeParticipantFromCourse(courseId, studentUId);

        uint256[] memory assessmentIds = assessmentDataManager().getAssessmentIdsToCourseId(courseId);
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (assessmentDataManager().isRegisteredToAssessment(studentUId, assessmentIds[i])) {
                assessmentDataManager().removeRegistrantFromAssessment(assessmentIds[i], studentUId);
            }
        }
    }

    // USED CONTRACTS

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(ContractNames.Name.COURSE_DATA_MANAGER));
    }

    function assessmentDataManager() internal view returns (AssessmentDataManager) {
        return AssessmentDataManager(addressBook.getAddress(ContractNames.Name.ASSESSMENT_DATA_MANAGER));
    }

    function performanceDataManager() internal view returns (PerformanceDataManager) {
        return PerformanceDataManager(addressBook.getAddress(ContractNames.Name.PERFORMANCE_DATA_MANAGER));
    }
}
