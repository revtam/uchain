pragma solidity >=0.8.7 <=0.8.17;

library CourseDataTypes {
    // enums
    enum CourseType {
        PUE,
        UE,
        VO,
        VU
    }

    enum AssessmentType {
        EXAM,
        SUBMISSION
    }

    enum SemesterSeason {
        WINTER,
        SUMMER
    }

    // structs
    struct Course {
        uint256 courseId;
        CourseContent courseContent;
    }

    struct CourseContent {
        string title;
        string code;
        CourseType courseType;
        Semester semester;
        string description;
        string examTopics;
        string language;
        uint256 ects;
        uint256 maxPlaces;
        uint256 registrationStart;
        uint256 registrationDeadline;
        uint256 deregistrationDeadline;
        Class[] classes;
        GradeLevel[] gradeLevels;
        string[] requirementCourseCodes;
    }

    struct Semester {
        uint256 year;
        SemesterSeason season;
    }

    struct Class {
        uint256 datetime;
        string place;
    }

    struct GradeLevel {
        uint256 grade;
        uint256 minPercentage;
    }

    struct Assessment {
        uint256 assessmentId;
        AssessmentContent assessmentContent;
    }

    struct AssessmentContent {
        string title;
        uint256 datetime;
        string place;
        AssessmentType assessmentType;
        uint256 maxPoints;
        uint256 minPoints; // min. required points for this assessment or automatically fail the course
        bool isRegistrationRequired;
        uint256 registrationStart;
        uint256 registrationDeadline;
        uint256 deregistrationDeadline;
    }
}
