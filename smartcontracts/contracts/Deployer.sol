pragma solidity >=0.8.7 <=0.8.17;

import "./accesscontrol/AdminAccess.sol";
import "./accesscontrol/AccessWhitelist.sol";
import "./logic/Faucet.sol";
import "./addressbook/AddressBook.sol";
import "./addressbook/ContractNames.sol";

contract Deployer {
    address public addressBook;

    address public storageAccessWhitelist;
    address public courseDataStorage;
    address public assessmentDataStorage;
    address public performanceStorage;
    address public gradeStorage;
    address public studyProgramStorage;
    address public registrationStorage;
    address public userStorage;

    address public datamanagerAccessWhitelist;
    address public courseDataManager;
    address public assessmentDataManager;
    address public performanceDataManager;
    address public programDataManager;
    address public registrationDataManager;
    address public userDataManager;

    address public faucet;
    address public courseController;
    address public performanceController;
    address public studyProgramController;
    address public userController;

    address public courseView;
    address public performanceView;
    address public studyProgramView;
    address public userView;

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deployStorages1(
        bytes memory addressBookContract,
        bytes memory accessWhitelistContract,
        bytes memory courseDataStorageContract,
        bytes memory assessmentDataStorageContract,
        bytes memory performanceStorageContract
    ) external onlyOwner {
        addressBook = deployContract(addressBookContract);

        storageAccessWhitelist = deployContract(accessWhitelistContract);
        datamanagerAccessWhitelist = deployContract(accessWhitelistContract);

        courseDataStorage = deployContract(
            addParametersToCode(courseDataStorageContract, abi.encode(storageAccessWhitelist))
        );
        assessmentDataStorage = deployContract(
            addParametersToCode(assessmentDataStorageContract, abi.encode(storageAccessWhitelist))
        );
        performanceStorage = deployContract(
            addParametersToCode(performanceStorageContract, abi.encode(storageAccessWhitelist))
        );
    }

    function deployStorages2(
        bytes memory gradeStorageContract,
        bytes memory studyProgramStorageContract,
        bytes memory registrationStorageContract,
        bytes memory userStorageContract
    ) external onlyOwner {
        gradeStorage = deployContract(
            addParametersToCode(gradeStorageContract, abi.encode(storageAccessWhitelist))
        );
        studyProgramStorage = deployContract(
            addParametersToCode(studyProgramStorageContract, abi.encode(storageAccessWhitelist))
        );
        registrationStorage = deployContract(
            addParametersToCode(registrationStorageContract, abi.encode(storageAccessWhitelist))
        );
        userStorage = deployContract(
            addParametersToCode(userStorageContract, abi.encode(storageAccessWhitelist))
        );
    }

    function deployDatamanagers(
        bytes memory courseDataManagerContract,
        bytes memory assessmentDataManagerContract,
        bytes memory performanceDataManagerContract,
        bytes memory programDataManagerContract,
        bytes memory registrationDataManagerContract,
        bytes memory userDataManagerContract
    ) external onlyOwner {
        courseDataManager = deployContract(
            addParametersToCode(
                courseDataManagerContract,
                abi.encode(courseDataStorage, datamanagerAccessWhitelist)
            )
        );
        assessmentDataManager = deployContract(
            addParametersToCode(
                assessmentDataManagerContract,
                abi.encode(assessmentDataStorage, datamanagerAccessWhitelist)
            )
        );
        performanceDataManager = deployContract(
            addParametersToCode(
                performanceDataManagerContract,
                abi.encode(performanceStorage, gradeStorage, datamanagerAccessWhitelist)
            )
        );
        programDataManager = deployContract(
            addParametersToCode(
                programDataManagerContract,
                abi.encode(studyProgramStorage, datamanagerAccessWhitelist)
            )
        );
        registrationDataManager = deployContract(
            addParametersToCode(
                registrationDataManagerContract,
                abi.encode(registrationStorage, datamanagerAccessWhitelist)
            )
        );
        userDataManager = deployContract(
            addParametersToCode(userDataManagerContract, abi.encode(userStorage, datamanagerAccessWhitelist))
        );
    }

    function deployControllers(
        bytes memory courseControllerContract,
        bytes memory performanceControllerContract,
        bytes memory studyProgramControllerContract,
        bytes memory userControllerContract,
        bytes memory faucetContract
    ) external onlyOwner {
        faucet = deployContract(faucetContract);
        courseController = deployContract(
            addParametersToCode(courseControllerContract, abi.encode(addressBook))
        );
        performanceController = deployContract(
            addParametersToCode(performanceControllerContract, abi.encode(addressBook))
        );
        studyProgramController = deployContract(
            addParametersToCode(studyProgramControllerContract, abi.encode(addressBook))
        );
        userController = deployContract(
            addParametersToCode(userControllerContract, abi.encode(addressBook, payable(faucet)))
        );
    }

    function deployViews(
        bytes memory courseViewContract,
        bytes memory performanceViewContract,
        bytes memory studyProgramViewContract,
        bytes memory userViewContract
    ) external onlyOwner {
        courseView = deployContract(addParametersToCode(courseViewContract, abi.encode(addressBook)));
        performanceView = deployContract(
            addParametersToCode(performanceViewContract, abi.encode(addressBook))
        );
        studyProgramView = deployContract(
            addParametersToCode(studyProgramViewContract, abi.encode(addressBook))
        );
        userView = deployContract(addParametersToCode(userViewContract, abi.encode(addressBook)));
    }

    function configureDeployments(address registratorServerWalletAddress) external onlyOwner {
        AddressBook _addressBook = AddressBook(addressBook);
        _addressBook.addEntry(ContractNames.Name.COURSE_DATA_MANAGER, courseDataManager);
        _addressBook.addEntry(ContractNames.Name.ASSESSMENT_DATA_MANAGER, assessmentDataManager);
        _addressBook.addEntry(ContractNames.Name.PERFORMANCE_DATA_MANAGER, performanceDataManager);
        _addressBook.addEntry(ContractNames.Name.PROGRAM_DATA_MANAGER, programDataManager);
        _addressBook.addEntry(ContractNames.Name.REGISTRATION_DATA_MANAGER, registrationDataManager);
        _addressBook.addEntry(ContractNames.Name.USER_DATA_MANAGER, userDataManager);

        AccessWhitelist _storageAccessWhitelist = AccessWhitelist(storageAccessWhitelist);
        _storageAccessWhitelist.grantAccess(owner);
        _storageAccessWhitelist.grantAccess(courseDataManager);
        _storageAccessWhitelist.grantAccess(assessmentDataManager);
        _storageAccessWhitelist.grantAccess(performanceDataManager);
        _storageAccessWhitelist.grantAccess(programDataManager);
        _storageAccessWhitelist.grantAccess(registrationDataManager);
        _storageAccessWhitelist.grantAccess(userDataManager);

        AccessWhitelist _datamanagerAccessWhitelist = AccessWhitelist(datamanagerAccessWhitelist);
        _datamanagerAccessWhitelist.addAdmin(owner);
        _datamanagerAccessWhitelist.grantAccess(owner);
        _datamanagerAccessWhitelist.grantAccess(courseController);
        _datamanagerAccessWhitelist.grantAccess(performanceController);
        _datamanagerAccessWhitelist.grantAccess(studyProgramController);
        _datamanagerAccessWhitelist.grantAccess(userController);
        _datamanagerAccessWhitelist.grantAccess(courseView);
        _datamanagerAccessWhitelist.grantAccess(performanceView);
        _datamanagerAccessWhitelist.grantAccess(studyProgramView);
        _datamanagerAccessWhitelist.grantAccess(userView);

        Faucet(payable(faucet)).addAdmin(owner);
        Faucet(payable(faucet)).addAdmin(userController);

        AdminAccess(studyProgramController).addAdmin(owner);

        AdminAccess(userController).addAdmin(owner);
        AdminAccess(userController).addAdmin(registratorServerWalletAddress);
    }

    function deployContract(bytes memory contractCode) public returns (address) {
        address deployedAddress;
        assembly {
            deployedAddress := create(0, add(contractCode, 0x20), mload(contractCode))
            if iszero(extcodesize(deployedAddress)) {
                revert(0, 0)
            }
        }
        return deployedAddress;
    }

    function addParametersToCode(bytes memory code, bytes memory encodedParams)
        private
        pure
        returns (bytes memory)
    {
        return abi.encodePacked(code, encodedParams);
    }
}
