pragma solidity >=0.8.7 <=0.8.17;

library CourseDataTypes {
    // enums
    enum CourseType {
        PUE,
        UE,
        VO,
        VU
    }

    enum AppointmentType {
        EXAM,
        SUBMISSION
    }

    enum EvaluationToCountType {
        LATEST_RESULT,
        BEST_RESULT
    }

    // structs
    struct Course {
        uint256 courseId;
        CourseContent content;
    }

    struct CourseContent {
        string title;
        string code;
        string description;
        string examTopics;
        string language;
        uint256 ects;
        uint256 maxPlaces;
        uint256 registrationDeadline;
        uint256 deregistrationDeadline;
        Class[] classes;
        GradeLevel[] gradeLevels;
        string[] requirementCourseCodes;
        CourseType courseType;
    }

    struct Class {
        uint256 datetime;
        string place;
    }

    struct GradeLevel {
        uint256 grade;
        uint256 minPercentage;
    }

    struct Appointment {
        uint256 appointmentId;
        AppointmentContent content;
    }

    struct AppointmentContent {
        uint256 datetime;
        string place;
        bool isRegistrationRequired;
        uint256 registrationDeadline;
        AppointmentType appointmentType;
    }

    struct Assessment {
        uint256 assessmentId;
        AssessmentContent content;
    }

    struct AssessmentContent {
        string title;
        EvaluationToCountType evaluationToCount; // decides which one of its appointment's corresponding evaluations a should be used for calculating the final grade
        uint256 maxPoints;
        uint256 minPoints; // min. required points for this assessment or automatically fail the course
    }
}
