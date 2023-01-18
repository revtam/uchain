import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PerformanceDataManager,
  PerformanceDataManagerMethodNames,
  PerformanceDataManagerEventsContext,
  PerformanceDataManagerEvents
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
export type PerformanceDataManagerEvents = undefined;
export interface PerformanceDataManagerEventsContext {}
export type PerformanceDataManagerMethodNames =
  | 'new'
  | 'getAchievedPoints'
  | 'getAttendanceValue'
  | 'getEvaluation'
  | 'getEvaluatorUId'
  | 'getExamAttendance'
  | 'getGrade'
  | 'getGraderUId'
  | 'getSubmission'
  | 'getSubmissionDeadline'
  | 'isAttendanceSet'
  | 'isEvaluationSet'
  | 'isFinalGradeSet'
  | 'isGradeSet'
  | 'isSubmissionSet'
  | 'setEvaluation'
  | 'setExamAttendance'
  | 'setOrOverrideEvaluation'
  | 'setOrOverrideGrade'
  | 'setOrOverrideSubmission';
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
export interface ExamattendanceResponse {
  isSet: boolean;
  0: boolean;
  hasAttended: boolean;
  1: boolean;
  confirmationDateTime: BigNumber;
  2: BigNumber;
}
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
export interface SubmissionResponse {
  isSet: boolean;
  0: boolean;
  submissionDatetime: BigNumber;
  1: BigNumber;
  documentHashes: string[];
  2: string[];
}
export interface PerformanceDataManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param performanceStorageAddress Type: address, Indexed: false
   * @param gradeStorageAddress Type: address, Indexed: false
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    performanceStorageAddress: string,
    gradeStorageAddress: string,
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
  getAchievedPoints(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAttendanceValue(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
  getEvaluatorUId(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
  getGraderUId(
    uId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
  getSubmissionDeadline(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  isAttendanceSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  isEvaluationSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  isFinalGradeSet(
    uId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  isGradeSet(
    uId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   */
  isSubmissionSet(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   * @param achievedPoints Type: uint256, Indexed: false
   * @param feedback Type: string, Indexed: false
   * @param lecturerUId Type: uint256, Indexed: false
   */
  setEvaluation(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    timestamp: BigNumberish,
    achievedPoints: BigNumberish,
    feedback: string,
    lecturerUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param hasAttended Type: bool, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   */
  setExamAttendance(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    hasAttended: boolean,
    timestamp: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   * @param achievedPoints Type: uint256, Indexed: false
   * @param feedback Type: string, Indexed: false
   * @param lecturerUId Type: uint256, Indexed: false
   */
  setOrOverrideEvaluation(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    timestamp: BigNumberish,
    achievedPoints: BigNumberish,
    feedback: string,
    lecturerUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   * @param grade Type: uint256, Indexed: false
   * @param feedback Type: string, Indexed: false
   * @param lecturerUId Type: uint256, Indexed: false
   * @param isAutomatic Type: bool, Indexed: false
   */
  setOrOverrideGrade(
    uId: BigNumberish,
    courseId: BigNumberish,
    timestamp: BigNumberish,
    grade: BigNumberish,
    feedback: string,
    lecturerUId: BigNumberish,
    isAutomatic: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   * @param documentHashes Type: string[], Indexed: false
   */
  setOrOverrideSubmission(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    timestamp: BigNumberish,
    documentHashes: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
