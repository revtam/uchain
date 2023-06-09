pragma solidity >=0.8.7 <=0.8.17;

import "./Controller.sol";
import "../accesscontrol/AdminAccess.sol";
import "../datatypes/UserDataTypes.sol";
import "../data/datamanager/RegistrationDataManager.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "./Faucet.sol";

contract UserController is Controller, AdminAccess {
    Faucet faucet;

    bool public isAutomaticAcceptanceOn = false;

    constructor(address addressBookAddress, address payable faucetAddress) Controller(addressBookAddress) {
        faucet = Faucet(faucetAddress);
    }

    /**
     * @notice This function is mainly for prototype demonstration purposes. It makes possible that any user can registred without
     * waiting for a study program manager to accept their request.
     */
    function setAutomaticAcceptance(bool newValue) external onlyAdmin {
        isAutomaticAcceptanceOn = newValue;
    }

    /**
     * @notice User request registration, registration status: under review.
     */
    function requestRegistration(address userAddress, UserDataTypes.UserProfile calldata profile)
        external
        onlyAdmin
    {
        // validation
        requireAddressNotRegistered(userAddress);
        for (uint256 i = 0; i < profile.studyProgramIds.length; ++i) {
            // built-in validation: reverts if study program to this program ID doesn't exist
            programDataManager().getStudyProgram(profile.studyProgramIds[i]);
        }

        // action
        // built-in validation: registration storage won't allow to add a registration for an address that has a pending registration already
        registrationDataManager().createRegistration(
            userAddress,
            UserDataTypes.RegistrationStatus.UNDER_REVIEW,
            profile
        );
        if (isAutomaticAcceptanceOn) {
            judgeRegistration(userAddress, UserDataTypes.RegistrationStatus.ACCEPTED);
        }
    }

    /**
     * @notice Study program manager accepts registration, registration status: accepted.
     */
    function acceptRegistration(address userAddress) external onlySPM {
        judgeRegistration(userAddress, UserDataTypes.RegistrationStatus.ACCEPTED);
    }

    function adminAcceptRegistration(address userAddress) external onlyAdmin {
        judgeRegistration(userAddress, UserDataTypes.RegistrationStatus.ACCEPTED);
    }

    /**
     * @notice Study program manager rejects registration, registration status: rejected.
     */
    function rejectRegistration(address userAddress) external onlySPM {
        judgeRegistration(userAddress, UserDataTypes.RegistrationStatus.REJECTED);
    }

    function adminRejectRegistration(address userAddress) external onlyAdmin {
        judgeRegistration(userAddress, UserDataTypes.RegistrationStatus.REJECTED);
    }

    /**
     * @notice User acknowledges registration result (rejected or accepted). If accepted, user is created. Either ways, registration is
     * removed from the heap of pending registrations.
     */
    function acknowledgeRegistrationResult() external {
        // validation
        requireAddressNotRegistered(msg.sender);
        // built-in validation: registration storage will revert if a the provided address doesn't have a pending registration connected to it
        UserDataTypes.RegistrationStatus registrationStatus = registrationDataManager()
            .getRegistrationStatusToAddress(msg.sender);
        require(
            registrationStatus != UserDataTypes.RegistrationStatus.UNDER_REVIEW,
            "Registration is still under review"
        );

        // action
        if (registrationStatus == UserDataTypes.RegistrationStatus.ACCEPTED) {
            UserDataTypes.Registration memory registration = registrationDataManager()
                .getRegistrationToAddress(msg.sender);
            userDataManager().createUser(registration.userAddress, registration.profile);
            faucet.sendFullAmountTokens(payable(msg.sender)); // send tokens to allow using the system
        }
        registrationDataManager().deleteRegistration(msg.sender);
    }

    function requestExtraTokens() external onlyRegistered {
        faucet.sendFullAmountTokens(payable(msg.sender));
    }

    // PRIVATE FUNCTIONS

    function judgeRegistration(address userAddress, UserDataTypes.RegistrationStatus toStatus) private {
        // validation
        requireAddressNotRegistered(userAddress);

        // action
        // built-in validation: registration storage will revert if a the provided address doesn't have a pending registration connected to it
        registrationDataManager().changeRegistrationStatus(userAddress, toStatus);
        faucet.sendInitialAmountTokens(payable(userAddress)); // send small amount of tokens to user to allow registration result acknowledging transaction
    }

    function requireAddressNotRegistered(address userAddress) private view {
        require(!userDataManager().isAddressRegistered(userAddress), "Address has already been registered");
    }

    // USED CONTRACTS

    function programDataManager() internal view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress(ContractNames.Name.PROGRAM_DATA_MANAGER));
    }

    function registrationDataManager() internal view returns (RegistrationDataManager) {
        return RegistrationDataManager(addressBook.getAddress(ContractNames.Name.REGISTRATION_DATA_MANAGER));
    }
}
