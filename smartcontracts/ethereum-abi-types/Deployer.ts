import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Deployer,
  DeployerMethodNames,
  DeployerEventsContext,
  DeployerEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type DeployerEvents = undefined;
export interface DeployerEventsContext {}
export type DeployerMethodNames =
  | 'new'
  | 'addressBook'
  | 'assessmentDataManager'
  | 'assessmentDataStorage'
  | 'configureDeployments'
  | 'courseController'
  | 'courseDataManager'
  | 'courseDataStorage'
  | 'courseView'
  | 'datamanagerAccessWhitelist'
  | 'deployContract'
  | 'deployControllers'
  | 'deployDatamanagers'
  | 'deployStorages1'
  | 'deployStorages2'
  | 'deployViews'
  | 'faucet'
  | 'gradeStorage'
  | 'performanceController'
  | 'performanceDataManager'
  | 'performanceStorage'
  | 'performanceView'
  | 'programDataManager'
  | 'registrationDataManager'
  | 'registrationStorage'
  | 'storageAccessWhitelist'
  | 'studyProgramController'
  | 'studyProgramStorage'
  | 'studyProgramView'
  | 'userController'
  | 'userDataManager'
  | 'userStorage'
  | 'userView';
export interface Deployer {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  addressBook(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  assessmentDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  assessmentDataStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param registratorServerWalletAddress Type: address, Indexed: false
   */
  configureDeployments(
    registratorServerWalletAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  courseController(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  courseDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  courseDataStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  courseView(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  datamanagerAccessWhitelist(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param contractCode Type: bytes, Indexed: false
   */
  deployContract(
    contractCode: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseControllerContract Type: bytes, Indexed: false
   * @param performanceControllerContract Type: bytes, Indexed: false
   * @param studyProgramControllerContract Type: bytes, Indexed: false
   * @param userControllerContract Type: bytes, Indexed: false
   * @param faucetContract Type: bytes, Indexed: false
   */
  deployControllers(
    courseControllerContract: Arrayish,
    performanceControllerContract: Arrayish,
    studyProgramControllerContract: Arrayish,
    userControllerContract: Arrayish,
    faucetContract: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseDataManagerContract Type: bytes, Indexed: false
   * @param assessmentDataManagerContract Type: bytes, Indexed: false
   * @param performanceDataManagerContract Type: bytes, Indexed: false
   * @param programDataManagerContract Type: bytes, Indexed: false
   * @param registrationDataManagerContract Type: bytes, Indexed: false
   * @param userDataManagerContract Type: bytes, Indexed: false
   */
  deployDatamanagers(
    courseDataManagerContract: Arrayish,
    assessmentDataManagerContract: Arrayish,
    performanceDataManagerContract: Arrayish,
    programDataManagerContract: Arrayish,
    registrationDataManagerContract: Arrayish,
    userDataManagerContract: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param addressBookContract Type: bytes, Indexed: false
   * @param accessWhitelistContract Type: bytes, Indexed: false
   * @param courseDataStorageContract Type: bytes, Indexed: false
   * @param assessmentDataStorageContract Type: bytes, Indexed: false
   * @param performanceStorageContract Type: bytes, Indexed: false
   */
  deployStorages1(
    addressBookContract: Arrayish,
    accessWhitelistContract: Arrayish,
    courseDataStorageContract: Arrayish,
    assessmentDataStorageContract: Arrayish,
    performanceStorageContract: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gradeStorageContract Type: bytes, Indexed: false
   * @param studyProgramStorageContract Type: bytes, Indexed: false
   * @param registrationStorageContract Type: bytes, Indexed: false
   * @param userStorageContract Type: bytes, Indexed: false
   */
  deployStorages2(
    gradeStorageContract: Arrayish,
    studyProgramStorageContract: Arrayish,
    registrationStorageContract: Arrayish,
    userStorageContract: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseViewContract Type: bytes, Indexed: false
   * @param performanceViewContract Type: bytes, Indexed: false
   * @param studyProgramViewContract Type: bytes, Indexed: false
   * @param userViewContract Type: bytes, Indexed: false
   */
  deployViews(
    courseViewContract: Arrayish,
    performanceViewContract: Arrayish,
    studyProgramViewContract: Arrayish,
    userViewContract: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  faucet(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  gradeStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  performanceController(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  performanceDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  performanceStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  performanceView(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  programDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  registrationDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  registrationStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  storageAccessWhitelist(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  studyProgramController(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  studyProgramStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  studyProgramView(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  userController(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  userDataManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  userStorage(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  userView(overrides?: ContractCallOverrides): Promise<string>;
}
