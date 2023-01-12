import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  RegistrationDataManager,
  RegistrationDataManagerMethodNames,
  RegistrationDataManagerEventsContext,
  RegistrationDataManagerEvents
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
export type RegistrationDataManagerEvents = undefined;
export interface RegistrationDataManagerEventsContext {}
export type RegistrationDataManagerMethodNames =
  | 'new'
  | 'changeRegistrationStatus'
  | 'createRegistration'
  | 'deleteRegistration'
  | 'getAllPendingRegistrations'
  | 'getRegistrationStatusToAddress'
  | 'getRegistrationToAddress'
  | 'isAddressRegistering';
export interface DateOfBirthRequest {
  year: BigNumberish;
  month: BigNumberish;
  day: BigNumberish;
}
export interface CreateRegistrationRequest {
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
export interface DateOfBirthResponse {
  year: BigNumber;
  0: BigNumber;
  month: BigNumber;
  1: BigNumber;
  day: BigNumber;
  2: BigNumber;
}
export interface ProfileResponse {
  firstName: string;
  0: ProfileResponse;
  lastName: string;
  1: ProfileResponse;
  gender: number;
  2: ProfileResponse;
  dateOfBirth: DateOfBirthResponse;
  3: ProfileResponse;
  nationality: string;
  4: ProfileResponse;
  phoneNumber: string;
  5: ProfileResponse;
  emailAddress: string;
  6: ProfileResponse;
  role: number;
  7: ProfileResponse;
  studyProgramIds: BigNumber[];
  8: ProfileResponse;
}
export interface RegistrationResponse {
  userAddress: string;
  0: string;
  status: number;
  1: number;
  profile: ProfileResponse;
  2: ProfileResponse;
}
export interface RegistrationDataManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param registrationStorageAddress Type: address, Indexed: false
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    registrationStorageAddress: string,
    accessWhitelistAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   * @param newStatus Type: uint8, Indexed: false
   */
  changeRegistrationStatus(
    _address: string,
    newStatus: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   * @param status Type: uint8, Indexed: false
   * @param profile Type: tuple, Indexed: false
   */
  createRegistration(
    _address: string,
    status: BigNumberish,
    profile: CreateRegistrationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  deleteRegistration(
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllPendingRegistrations(
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  getRegistrationStatusToAddress(
    _address: string,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  getRegistrationToAddress(
    _address: string,
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  isAddressRegistering(
    _address: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
