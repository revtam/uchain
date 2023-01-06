import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  UserController,
  UserControllerMethodNames,
  UserControllerEventsContext,
  UserControllerEvents
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
export type UserControllerEvents = undefined;
export interface UserControllerEventsContext {}
export type UserControllerMethodNames =
  | 'new'
  | 'acceptRegistration'
  | 'acknowledgeRegistrationResult'
  | 'addAdmin'
  | 'adminAcceptRegistration'
  | 'adminRejectRegistration'
  | 'batchAddAdmin'
  | 'isAdmin'
  | 'isAutomaticAcceptanceOn'
  | 'rejectRegistration'
  | 'removeAdmin'
  | 'requestExtraTokens'
  | 'requestRegistration'
  | 'setAutomaticAcceptance';
export interface DateOfBirthRequest {
  year: BigNumberish;
  month: BigNumberish;
  day: BigNumberish;
}
export interface RequestRegistrationRequest {
  firstName: string;
  lastName: string;
  gender: BigNumberish;
  dateOfBirth: DateOfBirthRequest;
  nationality: string;
  phoneNumber: string;
  emailAddress: string;
  role: BigNumberish;
  studyProgramIds: BigNumberish[];
}
export interface UserController {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param userDataManagerAddress Type: address, Indexed: false
   * @param programDataManagerAddress Type: address, Indexed: false
   * @param registrationDataManagerAddress Type: address, Indexed: false
   * @param faucetAddress Type: address, Indexed: false
   */
  'new'(
    userDataManagerAddress: string,
    programDataManagerAddress: string,
    registrationDataManagerAddress: string,
    faucetAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  acceptRegistration(
    userAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  acknowledgeRegistrationResult(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  addAdmin(
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  adminAcceptRegistration(
    userAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  adminRejectRegistration(
    userAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param addresses Type: address[], Indexed: false
   */
  batchAddAdmin(
    addresses: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  isAdmin(
    _address: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  isAutomaticAcceptanceOn(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  rejectRegistration(
    userAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  removeAdmin(
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  requestExtraTokens(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   * @param profile Type: tuple, Indexed: false
   */
  requestRegistration(
    userAddress: string,
    profile: RequestRegistrationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newValue Type: bool, Indexed: false
   */
  setAutomaticAcceptance(
    newValue: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
