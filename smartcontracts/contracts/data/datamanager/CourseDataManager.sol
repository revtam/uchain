pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/CourseDataTypes.sol";
import "../../datatypes/Constants.sol";
import "../../helpers/NumberOperations.sol";
import "./helpers/IdGenerator.sol";

contract CourseDataManager is DataManager {
    IdGenerator.Counter private courseIdCounter = IdGenerator.initializeCounter();
    IdGenerator.Counter private assessmentIdCounter = IdGenerator.initializeCounter();
    IdGenerator.Counter private appointmentIdCounter = IdGenerator.initializeCounter();

    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS

    /**
     * @return Created course's courseId.
     */
    function createCourse(CourseDataTypes.CourseContent memory courseContent)
        external
        onlyWhitelisted
        returns (uint256)
    {
        requireStringNotEmpty(courseContent.title, "Title");
        requireStringNotEmpty(courseContent.code, "Course code");
        requireStringNotEmpty(courseContent.language, "Language");
        require(
            courseContent.registrationDeadline <= courseContent.deregistrationDeadline,
            "Registration deadline cannot be after deregistration deadline"
        );
        for (uint256 i = 0; i < courseContent.gradeLevels.length; ++i) {
            courseContent.gradeLevels[i].minPercentage = NumberOperations.ensurePrecision(
                courseContent.gradeLevels[i].minPercentage
            );
        }

        uint256 generatedCourseId = IdGenerator.generateId(courseIdCounter);
        courseStorage().storeCourse(CourseDataTypes.Course(generatedCourseId, courseContent));
        return generatedCourseId;
    }

    function addStudyPrograms(uint256 courseId, uint256[] calldata studyProgramIds) external onlyWhitelisted {
        for (uint256 i = 0; i < studyProgramIds.length; ++i) {
            courseStorage().storeStudyProgram(courseId, studyProgramIds[i]);
        }
    }

    function addLecturers(uint256 courseId, uint256[] calldata lecturerUIds) external onlyWhitelisted {
        for (uint256 i = 0; i < lecturerUIds.length; ++i) {
            courseStorage().storeLecturer(courseId, lecturerUIds[i]);
        }
    }

    function addAssessments(uint256 courseId, CourseDataTypes.AssessmentContent[] calldata assessmentContents)
        external
        onlyWhitelisted
    {
        for (uint256 i = 0; i < assessmentContents.length; ++i) {
            requireStringNotEmpty(assessmentContents[i].title, "Title");
            require(
                assessmentContents[i].minPoints <= assessmentContents[i].maxPoints,
                "Min points cannot be higher than max points"
            );
            courseStorage().storeAssessment(
                courseId,
                CourseDataTypes.Assessment(IdGenerator.generateId(assessmentIdCounter), assessmentContents[i])
            );
        }
    }

    function addAppointments(
        uint256 assessmentId,
        CourseDataTypes.AppointmentContent[] calldata appointmentContents
    ) external onlyWhitelisted {
        for (uint256 i = 0; i < appointmentContents.length; ++i) {
            if (appointmentContents[i].isRegistrationRequired == true) {
                require(
                    appointmentContents[i].registrationDeadline != 0,
                    "If appointment requires registration, deadline for registration must be set"
                );
            }
            courseStorage().storeAppointment(
                assessmentId,
                CourseDataTypes.Appointment(
                    IdGenerator.generateId(appointmentIdCounter),
                    appointmentContents[i]
                )
            );
        }
    }

    function addParticipantToCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseStorage().storeParticipant(courseId, uId);
    }

    function removeParticipantFromCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseStorage().removeParticipant(courseId, uId);
    }

    function addRegistrantToAppointment(uint256 appointmentId, uint256 uId) external onlyWhitelisted {
        courseStorage().storeRegistrant(appointmentId, uId);
    }

    function removeRegistrantFromAppointment(uint256 appointmentId, uint256 uId) external onlyWhitelisted {
        courseStorage().removeRegistrant(appointmentId, uId);
    }

    // READ FUNCTIONS

    function getCourseIdToAppointmentId(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        uint256 parentAssessmentId = courseStorage().getAssessmentIdOfAppointment(appointmentId);
        return courseStorage().getCourseIdOfAssessment(parentAssessmentId);
    }

    function getCourseIdToAssessmentId(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getCourseIdOfAssessment(assessmentId);
    }

    function getStudyProgramIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getStudyProgramIdsOfCourse(courseId);
    }

    function getRegistrationDeadline(uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getCourse(courseId).content.registrationDeadline;
    }

    function getRequirementCourseCodesOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (string[] memory)
    {
        CourseDataTypes.Course memory course = courseStorage().getCourse(courseId);
        return course.content.requirementCourseCodes;
    }

    function getDeregistrationDeadline(uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getCourse(courseId).content.deregistrationDeadline;
    }

    function getCourseParticipantIds(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getParticipantIdsOfCourse(courseId);
    }

    function getCourseMaxPlaces(uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getCourse(courseId).content.maxPlaces;
    }

    function getGradeLevels(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.GradeLevel[] memory)
    {
        return courseStorage().getCourse(courseId).content.gradeLevels;
    }

    function getEvaluationToCountType(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.EvaluationToCountType)
    {
        return courseStorage().getAssessment(assessmentId).content.evaluationToCount;
    }

    function getAppointmentType(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.AppointmentType)
    {
        return courseStorage().getAppointment(appointmentId).content.appointmentType;
    }

    function getAppointmentTime(uint256 appointmentId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getAppointment(appointmentId).content.datetime;
    }

    function isAppointmentRegistrationRequired(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return courseStorage().getAppointment(appointmentId).content.isRegistrationRequired;
    }

    function getAppointmentRegistrationDeadline(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return courseStorage().getAppointment(appointmentId).content.registrationDeadline;
    }

    function getAppointmentRegistrantIds(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getRegistrantIdsOfAppointment(appointmentId);
    }

    function getAppointmentsToAssessmentId(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Appointment[] memory)
    {
        return courseStorage().getAppointments(assessmentId);
    }

    function getAssessmentsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment[] memory)
    {
        return courseStorage().getAssessments(courseId);
    }

    function getCourseIdsToCourseCode(string calldata courseCode)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getCourseIdsByCode(courseCode);
    }

    function getCoursesToStudent(uint256 uId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseStorage().getCourseIdsOfParticipant(uId));
    }

    function getCoursesToLecturer(uint256 uId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseStorage().getCourseIdsOfLecturer(uId));
    }

    function getCoursesToProgramId(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseStorage().getCourseIdsOfStudyProgram(programId));
    }

    function getLecturerUIdsOfCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getLecturerIdsOfCourse(courseId);
    }

    function getCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course memory)
    {
        return courseStorage().getCourse(courseId);
    }

    function getAllCourses() external view onlyWhitelisted returns (CourseDataTypes.Course[] memory) {
        return courseStorage().getAllCourses();
    }

    // PRIVATE FUNCTIONS

    function requireCourseExisting(uint256 courseId) private view {
        // built-in validation: course storage reverts if course to this course ID doesn't exist
        courseStorage().getCourse(courseId);
    }

    function getCoursesToCourseIds(uint256[] memory courseIds)
        private
        view
        returns (CourseDataTypes.Course[] memory)
    {
        CourseDataTypes.Course[] memory courses = new CourseDataTypes.Course[](courseIds.length);
        for (uint256 i = 0; i < courseIds.length; ++i) {
            courses[i] = courseStorage().getCourse(courseIds[i]);
        }
        return courses;
    }
}
