import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PerformanceView,
  PerformanceViewMethodNames,
  PerformanceViewEventsContext,
  PerformanceViewEvents
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
export type PerformanceViewEvents = undefined;
export interface PerformanceViewEventsContext {}
export type PerformanceViewMethodNames =
  | 'new'
  | 'getEvaluation'
  | 'getEvaluationOfStudent'
  | 'getExamAttendance'
  | 'getExamAttendanceOfStudent'
  | 'getGrade'
  | 'getGradeOfStudent'
  | 'getSubmission'
  | 'getSubmissionOfStudent'
  | 'isEvaluationOfStudentSet'
  | 'isEvaluationSet'
  | 'isExamAttendanceOfStudentSet'
  | 'isExamAttendanceSet'
  | 'isGradeOfStudentSet'
  | 'isGradeSet'
  | 'isSubmissionOfStudentSet'
  | 'isSubmissionSet';
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
export interface GetEvaluationResponse {
  result0: EvaluationResponse;
  0: EvaluationResponse;
  result1: string;
  1: string;
  result2: string;
  2: string;
  length: 3;
}
export interface GetEvaluationOfStudentResponse {
  result0: EvaluationResponse;
  0: EvaluationResponse;
  result1: string;
  1: string;
  result2: string;
  2: string;
  length: 3;
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
export interface GetGradeResponse {
  result0: GradeResponse;
  0: GradeResponse;
  result1: string;
  1: string;
  result2: string;
  2: string;
  length: 3;
}
export interface GetGradeOfStudentResponse {
  result0: GradeResponse;
  0: GradeResponse;
  result1: string;
  1: string;
  result2: string;
  2: string;
  length: 3;
}
export interface SubmissionResponse {
  isSet: boolean;
  0: boolean;
  submissionDatetime: BigNumber;
  1: BigNumber;
  documentHashes: string[];
  2: string[];
}
export interface PerformanceView {
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
   * @param assessmentId Type: uint256, Indexed: false
   */
  getEvaluation(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetEvaluationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  getEvaluationOfStudent(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetEvaluationOfStudentResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getExamAttendance(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ExamattendanceResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  getExamAttendanceOfStudent(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<ExamattendanceResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getGrade(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetGradeResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  getGradeOfStudent(
    courseId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetGradeOfStudentResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getSubmission(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SubmissionResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  getSubmissionOfStudent(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SubmissionResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  isEvaluationOfStudentSet(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  isEvaluationSet(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  isExamAttendanceOfStudentSet(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  isExamAttendanceSet(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  isGradeOfStudentSet(
    courseId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  isGradeSet(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  isSubmissionOfStudentSet(
    assessmentId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  isSubmissionSet(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
