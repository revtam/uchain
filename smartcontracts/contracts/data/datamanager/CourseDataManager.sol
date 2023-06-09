pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/course/CourseDataStorage.sol";
import "../../datatypes/CourseDataTypes.sol";
import "../../datatypes/CommonDataTypes.sol";
import "../../helpers/NumberOperations.sol";
import "./helpers/IdGenerator.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract CourseDataManager is AccessController {
    CourseDataStorage courseDataStorage;

    IdGenerator.Counter private courseIdCounter = IdGenerator.initializeCounter();

    constructor(address courseDataStorageAddress, address accessWhitelistAddress)
        AccessController(accessWhitelistAddress)
    {
        courseDataStorage = CourseDataStorage(courseDataStorageAddress);
    }

    // WRITE FUNCTIONS

    /**
     * @return Created course's courseId.
     */
    function createCourse(CourseDataTypes.CourseContent memory courseContent)
        external
        onlyWhitelisted
        returns (uint256)
    {
        DataManagerCommonChecks.requireStringNotEmpty(courseContent.title, "Title");
        DataManagerCommonChecks.requireStringNotEmpty(courseContent.code, "Course code");
        DataManagerCommonChecks.requireStringNotEmpty(courseContent.language, "Language");
        for (uint256 i = 0; i < courseContent.gradeLevels.length; ++i) {
            courseContent.gradeLevels[i].minPercentage = NumberOperations.ensurePrecision(
                courseContent.gradeLevels[i].minPercentage
            );
        }

        uint256 generatedCourseId = IdGenerator.generateId(courseIdCounter);
        courseDataStorage.storeCourse(CourseDataTypes.Course(generatedCourseId, courseContent));
        emit CommonDataTypes.IdGeneration(generatedCourseId);
        return generatedCourseId;
    }

    function addStudyPrograms(uint256 courseId, uint256[] calldata studyProgramIds) external onlyWhitelisted {
        for (uint256 i = 0; i < studyProgramIds.length; ++i) {
            courseDataStorage.storeStudyProgram(courseId, studyProgramIds[i]);
        }
    }

    function addLecturers(uint256 courseId, uint256[] calldata lecturerUIds) external onlyWhitelisted {
        for (uint256 i = 0; i < lecturerUIds.length; ++i) {
            courseDataStorage.storeLecturer(courseId, lecturerUIds[i]);
        }
    }

    function addParticipantToCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseDataStorage.storeParticipant(courseId, uId);
    }

    function removeParticipantFromCourse(uint256 courseId, uint256 uId) external onlyWhitelisted {
        courseDataStorage.removeParticipant(courseId, uId);
    }

    // READ FUNCTIONS

    function getStudyProgramIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseDataStorage.getStudyProgramIdsOfCourse(courseId);
    }

    /**
     * @return tuple[registrationStartDate, registrationEndDate]
     */
    function getCourseRegistrationPeriod(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256, uint256)
    {
        return (
            courseDataStorage.getCourse(courseId).courseContent.registrationStart,
            courseDataStorage.getCourse(courseId).courseContent.registrationDeadline
        );
    }

    /**
     * @return tuple[deregistrationStartDate, deregistrationEndDate]
     */
    function getCourseDeregistrationPeriod(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256, uint256)
    {
        return (
            courseDataStorage.getCourse(courseId).courseContent.registrationStart,
            courseDataStorage.getCourse(courseId).courseContent.deregistrationDeadline
        );
    }

    function getCourseType(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.CourseType)
    {
        return courseDataStorage.getCourse(courseId).courseContent.courseType;
    }

    function getRequirementCourseCodesOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (string[] memory)
    {
        CourseDataTypes.Course memory course = courseDataStorage.getCourse(courseId);
        return course.courseContent.requirementCourseCodes;
    }

    function getCourseParticipantIds(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseDataStorage.getParticipantIdsOfCourse(courseId);
    }

    function isRegisteredToCourse(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return
            ArrayOperations.isElementInUintArray(uId, courseDataStorage.getParticipantIdsOfCourse(courseId));
    }

    function getCourseMaxPlaces(uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return courseDataStorage.getCourse(courseId).courseContent.maxPlaces;
    }

    function getGradeLevels(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.GradeLevel[] memory)
    {
        return courseDataStorage.getCourse(courseId).courseContent.gradeLevels;
    }

    function getCourseIdsToCourseCode(string calldata courseCode)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseDataStorage.getCourseIdsByCode(courseCode);
    }

    function getCoursesToStudent(uint256 uId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseDataStorage.getCourseIdsOfParticipant(uId));
    }

    function getCoursesToLecturer(uint256 uId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseDataStorage.getCourseIdsOfLecturer(uId));
    }

    function getCoursesToProgramId(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        return getCoursesToCourseIds(courseDataStorage.getCourseIdsOfStudyProgram(programId));
    }

    function getLecturerUIdsOfCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseDataStorage.getLecturerIdsOfCourse(courseId);
    }

    function getCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course memory)
    {
        return courseDataStorage.getCourse(courseId);
    }

    function getAllCourses() external view onlyWhitelisted returns (CourseDataTypes.Course[] memory) {
        return courseDataStorage.getAllCourses();
    }

    function getAllCourseCodes() external view onlyWhitelisted returns (string[] memory) {
        return courseDataStorage.getAllCourseCodes();
    }

    function getCoursesToCourseIds(uint256[] memory courseIds)
        public
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course[] memory)
    {
        CourseDataTypes.Course[] memory courses = new CourseDataTypes.Course[](courseIds.length);
        for (uint256 i = 0; i < courseIds.length; ++i) {
            courses[i] = courseDataStorage.getCourse(courseIds[i]);
        }
        return courses;
    }
}
