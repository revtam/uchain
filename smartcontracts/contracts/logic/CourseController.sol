pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/ArrayOperations.sol";
import "../helpers/GradeOperations.sol";
import "../datatypes/CourseDataTypes.sol";
import "./Controller.sol";

contract CourseController is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    /**
     * @param courseContent The object contains the array of GradeLevels which specify the grading percentage levels and
     * their associated grade: 4 grade levels are expected starting from the first passing grade to the best grade,
     * and the percentages should be defined with 4 digits, e.g. 32% = 3200, 51,65% = 5165.
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
        for (uint256 i = 0; i < studyProgramIds.length; ++i) {
            // built-in validation: reverts if study program to this program ID doesn't exist
            programDataManager().getStudyProgram(studyProgramIds[i]);
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
        courseDataManager().addAssessments(createdCourseId, assessmentContents);
    }

    /**
     * @notice Study program managers can add students to courses even after registration deadline,
     * with participant places full or if the study program doesn't allow it normally.
     */
    function addStudentToCourse(uint256 courseId, uint256 studentUId) external onlySPM {
        // validation
        requireUserAtUIdStudent(studentUId, userDataManager());

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
        for (uint256 i = 0; i < studyProgramIds.length; ++i) {
            require(
                ArrayOperations.isElementInUintArray(
                    studyProgramIds[i],
                    userDataManager().getEnrolledProgramIds(studentUId)
                ),
                "Student is not enrolled in the study program this course is available at"
            );
        }
        string[] memory requirementCourseCodes = courseDataManager().getRequirementCourseCodesOfCourse(
            courseId
        );
        for (uint256 i = 0; i < requirementCourseCodes.length; ++i) {
            uint256[] memory courseIdsToCourseCode = courseDataManager().getCourseIdsToCourseCode(
                requirementCourseCodes[i]
            );
            bool isRequirementFilled = false;
            for (uint256 j = 0; j < courseIdsToCourseCode.length; ++j) {
                if (performanceDataManager().isGradePositive(studentUId, courseIdsToCourseCode[j])) {
                    isRequirementFilled = true;
                    break;
                }
            }
            require(
                isRequirementFilled,
                string(abi.encodePacked("Requirement course is not filled: ", requirementCourseCodes[i]))
            );
        }
        require(
            courseDataManager().getCourseRegistrationDeadline(courseId) == 0 ||
                block.timestamp <= courseDataManager().getCourseRegistrationDeadline(courseId),
            "Course registration is not possible after the deadline"
        );
        require(
            courseDataManager().getCourseParticipantIds(courseId).length >=
                courseDataManager().getCourseMaxPlaces(courseId),
            "Course has reached its maximum participants"
        );

        // action
        registerStudentToCourse(courseId, studentUId);
    }

    function deregisterFromCourse(uint256 courseId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        require(
            courseDataManager().getCourseDeregistrationDeadline(courseId) == 0 ||
                block.timestamp <= courseDataManager().getCourseDeregistrationDeadline(courseId),
            "Course deregistration is not possible after the deadline"
        );
        // action
        deregisterStudentFromCourse(courseId, studentUId);
    }

    function registerToAssessment(uint256 assessmentId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAssessmentId(assessmentId);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        require(
            courseDataManager().isAssessmentRegistrationRequired(assessmentId),
            "This assessment does not require registration"
        );
        require(
            !isStudentRegisteredToAssessment(studentUId, assessmentId),
            "Student has already registered to this assessment"
        );
        require(
            block.timestamp <= courseDataManager().getAssessmentRegistrationDeadline(assessmentId),
            "Assessment registration deadline has passed"
        );

        // action
        courseDataManager().addRegistrantToAssessment(assessmentId, studentUId);
    }

    function deregisterFromAssessment(uint256 assessmentId) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        require(
            isStudentRegisteredToAssessment(studentUId, assessmentId),
            "Student has never registered to this assessment"
        );
        require(
            block.timestamp <= courseDataManager().getAssessmentDeregistrationDeadline(assessmentId),
            "Assessment deregistration deadline has passed"
        );

        // action
        courseDataManager().removeRegistrantFromAssessment(assessmentId, studentUId);
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
        // built-in validation: course storage doesn't allow to add student if the course doesn't exist
        courseDataManager().addParticipantToCourse(courseId, studentUId);
    }

    function deregisterStudentFromCourse(uint256 courseId, uint256 studentUId) private {
        // validation
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        // action
        // user performance data connected to this course is not deleted, so even after the user deregistered from the course,
        // the performance data is restored

        // built-in validation: course storage doesn't allow to remove student if the course doesn't exist
        courseDataManager().removeParticipantFromCourse(courseId, studentUId);

        uint256[] memory assessmentIds = courseDataManager().getAssessmentIdsToCourseId(courseId);
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (isStudentRegisteredToAssessment(studentUId, assessmentIds[i])) {
                courseDataManager().removeRegistrantFromAssessment(assessmentIds[i], studentUId);
            }
        }
    }

    function isStudentRegisteredToAssessment(uint256 studentUId, uint256 assessmentId)
        private
        view
        returns (bool)
    {
        return
            ArrayOperations.isElementInUintArray(
                studentUId,
                courseDataManager().getAssessmentRegistrantIds(assessmentId)
            );
    }
}
