import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  UserStorage,
  UserStorageMethodNames,
  UserStorageEventsContext,
  UserStorageEvents
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
export type UserStorageEvents = undefined;
export interface UserStorageEventsContext {}
export type UserStorageMethodNames =
  | 'new'
  | 'getAllUsers'
  | 'getUserByAddress'
  | 'getUserByAddressIfSet'
  | 'getUserByUId'
  | 'storeUser'
  | 'updateUserAddress';
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
export interface GetUserByAddressIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: UserResponse;
  1: UserResponse;
  length: 2;
}
export interface ProfileRequestRequest {
  year: BigNumberish;
  month: BigNumberish;
  day: BigNumberish;
}
export interface StoreUserRequest {
  uId: BigNumberish;
  profile: ProfileRequest;
}
export interface UserStorage {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    accessWhitelistAddress: string,
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
   * @param userAddress Type: address, Indexed: false
   */
  getUserByAddress(
    userAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<UserResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  getUserByAddressIfSet(
    userAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<GetUserByAddressIfSetResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   */
  getUserByUId(
    uId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   * @param user Type: tuple, Indexed: false
   */
  storeUser(
    userAddress: string,
    user: StoreUserRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param oldAddress Type: address, Indexed: false
   * @param newAddress Type: address, Indexed: false
   */
  updateUserAddress(
    oldAddress: string,
    newAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
