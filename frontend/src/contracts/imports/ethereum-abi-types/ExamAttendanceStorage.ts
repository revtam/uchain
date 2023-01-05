import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  ExamAttendanceStorage,
  ExamAttendanceStorageMethodNames,
  ExamAttendanceStorageEventsContext,
  ExamAttendanceStorageEvents
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
export type ExamAttendanceStorageEvents = undefined;
export interface ExamAttendanceStorageEventsContext {}
export type ExamAttendanceStorageMethodNames =
  | 'getExamAttendance'
  | 'getExamAttendanceIfSet'
  | 'storeExamAttendance';
export interface ExamattendanceResponse {
  isSet: boolean;
  0: boolean;
  hasAttended: boolean;
  1: boolean;
  confirmationDateTime: BigNumber;
  2: BigNumber;
}
export interface GetExamAttendanceIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: ExamattendanceResponse;
  1: ExamattendanceResponse;
  length: 2;
}
export interface StoreExamAttendanceRequest {
  isSet: boolean;
  hasAttended: boolean;
  confirmationDateTime: BigNumberish;
}
export interface ExamAttendanceStorage {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getExamAttendance(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ExamattendanceResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getExamAttendanceIfSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetExamAttendanceIfSetResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param examAttendance Type: tuple, Indexed: false
   */
  storeExamAttendance(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    examAttendance: StoreExamAttendanceRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
