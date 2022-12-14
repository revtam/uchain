pragma solidity >=0.8.7 <=0.8.17;

library UserDataTypes {
    // enums
    enum Gender {
        MALE,
        FEMALE,
        X
    }

    enum UserRole {
        STUDENT,
        LECTURER,
        STUDY_PROGRAM_MANAGER
    }

    enum RegistrationStatus {
        UNDER_REVIEW,
        REJECTED,
        ACCEPTED
    }

    // structs
    struct User {
        uint256 uId;
        UserProfile profile;
    }

    struct Registration {
        address userAddress;
        RegistrationStatus status;
        UserProfile profile;
    }

    struct UserProfile {
        string firstName;
        string lastName;
        Gender gender;
        Date dateOfBirth;
        string nationality;
        string phoneNumber;
        string emailAddress;
        UserRole role;
        uint256[] studyProgramIds;
    }

    struct Date {
        uint256 year;
        uint256 month;
        uint256 day;
    }
}
