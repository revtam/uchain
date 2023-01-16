import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  GradeStorage,
  GradeStorageMethodNames,
  GradeStorageEventsContext,
  GradeStorageEvents
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
export type GradeStorageEvents = undefined;
export interface GradeStorageEventsContext {}
export type GradeStorageMethodNames =
  | 'new'
  | 'getGrade'
  | 'getGradeIfSet'
  | 'storeGrade'
  | 'updateGrade';
export interface GradeResponse {
  isSet: boolean;
  0: boolean;
  value: BigNumber;
  1: BigNumber;
  feedback: string;
  2: string;
  datetime: BigNumber;
  3: BigNumber;
  lecturerUId: BigNumber;
  4: BigNumber;
  isAutomatic: boolean;
  5: boolean;
}
export interface GetGradeIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: GradeResponse;
  1: GradeResponse;
  length: 2;
}
export interface StoreGradeRequest {
  isSet: boolean;
  value: BigNumberish;
  feedback: string;
  datetime: BigNumberish;
  lecturerUId: BigNumberish;
  isAutomatic: boolean;
}
export interface UpdateGradeRequest {
  isSet: boolean;
  value: BigNumberish;
  feedback: string;
  datetime: BigNumberish;
  lecturerUId: BigNumberish;
  isAutomatic: boolean;
}
export interface GradeStorage {
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
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  getGrade(
    uId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GradeResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  getGradeIfSet(
    uId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetGradeIfSetResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   * @param grade Type: tuple, Indexed: false
   */
  storeGrade(
    uId: BigNumberish,
    courseId: BigNumberish,
    grade: StoreGradeRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   * @param grade Type: tuple, Indexed: false
   */
  updateGrade(
    uId: BigNumberish,
    courseId: BigNumberish,
    grade: UpdateGradeRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
