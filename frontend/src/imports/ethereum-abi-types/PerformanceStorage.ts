import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PerformanceStorage,
  PerformanceStorageMethodNames,
  PerformanceStorageEventsContext,
  PerformanceStorageEvents
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
export type PerformanceStorageEvents = undefined;
export interface PerformanceStorageEventsContext {}
export type PerformanceStorageMethodNames =
  | 'new'
  | 'getEvaluation'
  | 'getEvaluationIfSet'
  | 'getExamAttendance'
  | 'getExamAttendanceIfSet'
  | 'getSubmission'
  | 'getSubmissionIfSet'
  | 'storeEvaluation'
  | 'storeExamAttendance'
  | 'storeSubmission'
  | 'updateEvaluation'
  | 'updateSubmission';
export interface EvaluationResponse {
  isSet: boolean;
  0: boolean;
  datetime: BigNumber;
  1: BigNumber;
  achievedPoints: BigNumber;
  2: BigNumber;
  feedback: string;
  3: string;
  lecturerUId: BigNumber;
  4: BigNumber;
}
export interface GetEvaluationIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: EvaluationResponse;
  1: EvaluationResponse;
  length: 2;
}
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
export interface SubmissionResponse {
  isSet: boolean;
  0: boolean;
  submissionDatetime: BigNumber;
  1: BigNumber;
  documentHashes: string[];
  2: string[];
}
export interface GetSubmissionIfSetResponse {
  result0: boolean;
  0: boolean;
  result1: SubmissionResponse;
  1: SubmissionResponse;
  length: 2;
}
export interface StoreEvaluationRequest {
  isSet: boolean;
  datetime: BigNumberish;
  achievedPoints: BigNumberish;
  feedback: string;
  lecturerUId: BigNumberish;
}
export interface StoreExamAttendanceRequest {
  isSet: boolean;
  hasAttended: boolean;
  confirmationDateTime: BigNumberish;
}
export interface StoreSubmissionRequest {
  isSet: boolean;
  submissionDatetime: BigNumberish;
  documentHashes: string[];
}
export interface UpdateEvaluationRequest {
  isSet: boolean;
  datetime: BigNumberish;
  achievedPoints: BigNumberish;
  feedback: string;
  lecturerUId: BigNumberish;
}
export interface UpdateSubmissionRequest {
  isSet: boolean;
  submissionDatetime: BigNumberish;
  documentHashes: string[];
}
export interface PerformanceStorage {
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
   * @param assessmentId Type: uint256, Indexed: false
   */
  getEvaluation(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<EvaluationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getEvaluationIfSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetEvaluationIfSetResponse>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getSubmission(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SubmissionResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getSubmissionIfSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetSubmissionIfSetResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param evaluation Type: tuple, Indexed: false
   */
  storeEvaluation(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    evaluation: StoreEvaluationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param submission Type: tuple, Indexed: false
   */
  storeSubmission(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    submission: StoreSubmissionRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param evaluation Type: tuple, Indexed: false
   */
  updateEvaluation(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    evaluation: UpdateEvaluationRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param submission Type: tuple, Indexed: false
   */
  updateSubmission(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    submission: UpdateSubmissionRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
