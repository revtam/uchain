import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PerformanceController,
  PerformanceControllerMethodNames,
  PerformanceControllerEventsContext,
  PerformanceControllerEvents
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
export type PerformanceControllerEvents = undefined;
export interface PerformanceControllerEventsContext {}
export type PerformanceControllerMethodNames =
  | 'new'
  | 'addSubmission'
  | 'administerExamAttendance'
  | 'calculatePoints'
  | 'calculatePointsOfStudent'
  | 'giveEvaluation'
  | 'giveFinalGrade'
  | 'isMinPointsAchieved'
  | 'isMinPointsAchievedOfStudent';
export interface CalculatePointsResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface CalculatePointsOfStudentResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface PerformanceController {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param userDataManagerAddress Type: address, Indexed: false
   * @param courseDataManagerAddress Type: address, Indexed: false
   * @param assessmentDataManagerAddress Type: address, Indexed: false
   * @param performanceDataManagerAddress Type: address, Indexed: false
   */
  'new'(
    userDataManagerAddress: string,
    courseDataManagerAddress: string,
    assessmentDataManagerAddress: string,
    performanceDataManagerAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param documentHashes Type: string[], Indexed: false
   */
  addSubmission(
    assessmentId: BigNumberish,
    documentHashes: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param hasAttended Type: bool, Indexed: false
   */
  administerExamAttendance(
    studentUId: BigNumberish,
    assessmentId: BigNumberish,
    hasAttended: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  calculatePoints(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CalculatePointsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  calculatePointsOfStudent(
    studentUId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CalculatePointsOfStudentResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   * @param assessmentId Type: uint256, Indexed: false
   * @param achievedPoints Type: uint256, Indexed: false
   * @param feedback Type: string, Indexed: false
   */
  giveEvaluation(
    studentUId: BigNumberish,
    assessmentId: BigNumberish,
    achievedPoints: BigNumberish,
    feedback: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   * @param grade Type: uint256, Indexed: false
   * @param feedback Type: string, Indexed: false
   */
  giveFinalGrade(
    studentUId: BigNumberish,
    courseId: BigNumberish,
    grade: BigNumberish,
    feedback: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  isMinPointsAchieved(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   * @param courseId Type: uint256, Indexed: false
   */
  isMinPointsAchievedOfStudent(
    studentUId: BigNumberish,
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
