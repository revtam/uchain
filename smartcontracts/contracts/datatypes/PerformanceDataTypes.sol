pragma solidity >=0.8.7 <=0.8.17;

library PerformanceDataTypes {
    struct Grade {
        bool isSet;
        uint256 value;
        string feedback;
        uint256 datetime;
        uint256 lecturerUId;
        bool isFinal;
    }

    struct ExamAttendance {
        bool isSet;
        bool hasAttended;
        uint256 confirmationDateTime;
    }

    struct Submission {
        bool isSet;
        uint256 submissionDatetime;
        string[] documentHashes;
    }

    struct Evaluation {
        bool isSet;
        uint256 datetime;
        uint256 achievedPoints;
        string feedback;
        uint256 lecturerUId;
    }
}
