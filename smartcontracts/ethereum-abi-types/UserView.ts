import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  UserView,
  UserViewMethodNames,
  UserViewEventsContext,
  UserViewEvents
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
export type UserViewEvents = undefined;
export interface UserViewEventsContext {}
export type UserViewMethodNames =
  | 'new'
  | 'getAllUsers'
  | 'getPendingRegistration'
  | 'getPendingRegistrations'
  | 'getProfile'
  | 'getUId'
  | 'getUserRole'
  | 'isUserRegistered'
  | 'isUserRegistrationPending';
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
export interface UserResponse {
  uId: BigNumber;
  0: BigNumber;
  profile: ProfileResponse;
  1: ProfileResponse;
}
export interface RegistrationResponse {
  userAddress: string;
  0: string;
  status: number;
  1: number;
  profile: ProfileResponse;
  2: ProfileResponse;
}
export interface UserprofileResponse {
  firstName: string;
  0: string;
  lastName: string;
  1: string;
  gender: number;
  2: number;
  dateOfBirth: DateOfBirthResponse;
  3: DateOfBirthResponse;
  nationality: string;
  4: string;
  phoneNumber: string;
  5: string;
  emailAddress: string;
  6: string;
  role: number;
  7: number;
  studyProgramIds: BigNumber[];
  8: BigNumber[];
}
export interface UserView {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param addressBookAddress Type: address, Indexed: false
   */
  'new'(
    addressBookAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllUsers(overrides?: ContractCallOverrides): Promise<UserResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPendingRegistration(
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPendingRegistrations(
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProfile(overrides?: ContractCallOverrides): Promise<UserprofileResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getUId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getUserRole(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  isUserRegistered(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  isUserRegistrationPending(
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
