import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  RegistrationStorage,
  RegistrationStorageMethodNames,
  RegistrationStorageEventsContext,
  RegistrationStorageEvents
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
export type RegistrationStorageEvents = undefined;
export interface RegistrationStorageEventsContext {}
export type RegistrationStorageMethodNames =
  | 'new'
  | 'getAllRegistrations'
  | 'getRegistration'
  | 'getRegistrationIfSet'
  | 'removeRegistration'
  | 'storeRegistration'
  | 'updateRegistration';
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
export interface GetRegistrationIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: RegistrationResponse;
  1: RegistrationResponse;
  length: 2;
}
export interface ProfileRequestRequest {
  year: BigNumberish;
  month: BigNumberish;
  day: BigNumberish;
}
export interface StoreRegistrationRequest {
  userAddress: string;
  status: BigNumberish;
  profile: ProfileRequest;
}
export interface UpdateRegistrationRequest {
  userAddress: string;
  status: BigNumberish;
  profile: ProfileRequest;
}
export interface RegistrationStorage {
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
  getAllRegistrations(
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  getRegistration(
    userAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<RegistrationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  getRegistrationIfSet(
    userAddress: string,
    overrides?: ContractCallOverrides
  ): Promise<GetRegistrationIfSetResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   */
  removeRegistration(
    userAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param registration Type: tuple, Indexed: false
   */
  storeRegistration(
    registration: StoreRegistrationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param registration Type: tuple, Indexed: false
   */
  updateRegistration(
    registration: UpdateRegistrationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
