pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/CourseDataTypes.sol";
import "../../datatypes/Constants.sol";
import "../../helpers/NumberOperations.sol";
import "./helpers/IdGenerator.sol";

contract CourseDataManager is DataManager {
    IdGenerator.Counter private courseIdCounter = IdGenerator.initializeCounter();
    IdGenerator.Counter private assessmentIdCounter = IdGenerator.initializeCounter();

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
            require(
                assessmentContents[i].registrationDeadline <= assessmentContents[i].deregistrationDeadline,
                "Registration deadline cannot be after deregistration deadline"
            );
            courseStorage().storeAssessment(
                courseId,
                CourseDataTypes.Assessment(IdGenerator.generateId(assessmentIdCounter), assessmentContents[i])
            );
        }
    }

    function addParticipantToCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseStorage().storeParticipant(courseId, uId);
    }

    function removeParticipantFromCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseStorage().removeParticipant(courseId, uId);
    }

    function addRegistrantToAssessment(uint256 assessmentId, uint256 uId) external onlyWhitelisted {
        courseStorage().storeRegistrant(assessmentId, uId);
    }

    function removeRegistrantFromAssessment(uint256 assessmentId, uint256 uId) external onlyWhitelisted {
        courseStorage().removeRegistrant(assessmentId, uId);
    }

    // READ FUNCTIONS

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

    function getCourseRegistrationDeadline(uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getCourse(courseId).content.registrationDeadline;
    }

    function getCourseDeregistrationDeadline(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return courseStorage().getCourse(courseId).content.deregistrationDeadline;
    }

    function getCourseType(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.CourseType)
    {
        return courseStorage().getCourse(courseId).content.courseType;
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

    function getAssessmentType(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.AssessmentType)
    {
        return courseStorage().getAssessment(assessmentId).content.assessmentType;
    }

    function getAssessmentTime(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getAssessment(assessmentId).content.datetime;
    }

    function getAssessmentMinPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getAssessment(assessmentId).content.minPoints;
    }

    function getAssessmentMaxPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return courseStorage().getAssessment(assessmentId).content.maxPoints;
    }

    function isAssessmentRegistrationRequired(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return courseStorage().getAssessment(assessmentId).content.isRegistrationRequired;
    }

    function getAssessmentRegistrationDeadline(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return courseStorage().getAssessment(assessmentId).content.registrationDeadline;
    }

    function getAssessmentDeregistrationDeadline(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return courseStorage().getAssessment(assessmentId).content.deregistrationDeadline;
    }

    function getAssessmentRegistrantIds(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseStorage().getRegistrantIdsOfAssessment(assessmentId);
    }

    function getAssessmentsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment[] memory)
    {
        return courseStorage().getAssessments(courseId);
    }

    function getAssessmentIdsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        CourseDataTypes.Assessment[] memory assessments = courseStorage().getAssessments(courseId);
        uint256[] memory assessmentIds = new uint256[](assessments.length);
        for (uint256 i = 0; i < assessments.length; ++i) {
            assessmentIds[i] = assessments[i].assessmentId;
        }
        return assessmentIds;
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
