import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AssessmentDataManager,
  AssessmentDataManagerMethodNames,
  AssessmentDataManagerEventsContext,
  AssessmentDataManagerEvents
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
export type AssessmentDataManagerEvents = undefined;
export interface AssessmentDataManagerEventsContext {}
export type AssessmentDataManagerMethodNames =
  | 'new'
  | 'addAssessments'
  | 'addRegistrantToAssessment'
  | 'getAssessmentDeregistrationPeriod'
  | 'getAssessmentIdsToCourseId'
  | 'getAssessmentMaxPoints'
  | 'getAssessmentMinPoints'
  | 'getAssessmentRegistrantIds'
  | 'getAssessmentRegistrationPeriod'
  | 'getAssessmentTime'
  | 'getAssessmentType'
  | 'getAssessmentsToCourseId'
  | 'getCourseIdToAssessmentId'
  | 'isAssessmentRegistrationRequired'
  | 'removeRegistrantFromAssessment';
export interface AddAssessmentsRequest {
  title: string;
  datetime: BigNumberish;
  place: string;
  assessmentType: BigNumberish;
  maxPoints: BigNumberish;
  minPoints: BigNumberish;
  isRegistrationRequired: boolean;
  registrationStart: BigNumberish;
  registrationDeadline: BigNumberish;
  deregistrationDeadline: BigNumberish;
}
export interface GetAssessmentDeregistrationPeriodResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface GetAssessmentRegistrationPeriodResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface ContentResponse {
  title: string;
  0: ContentResponse;
  datetime: BigNumber;
  1: ContentResponse;
  place: string;
  2: ContentResponse;
  assessmentType: number;
  3: ContentResponse;
  maxPoints: BigNumber;
  4: ContentResponse;
  minPoints: BigNumber;
  5: ContentResponse;
  isRegistrationRequired: boolean;
  6: ContentResponse;
  registrationStart: BigNumber;
  7: ContentResponse;
  registrationDeadline: BigNumber;
  8: ContentResponse;
  deregistrationDeadline: BigNumber;
  9: ContentResponse;
}
export interface AssessmentResponse {
  assessmentId: BigNumber;
  0: BigNumber;
  content: ContentResponse;
  1: ContentResponse;
}
export interface AssessmentDataManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param assessmentDataStorageAddress Type: address, Indexed: false
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    assessmentDataStorageAddress: string,
    accessWhitelistAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param assessmentContents Type: tuple[], Indexed: false
   */
  addAssessments(
    courseId: BigNumberish,
    assessmentContents: AddAssessmentsRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param uId Type: uint256, Indexed: false
   */
  addRegistrantToAssessment(
    assessmentId: BigNumberish,
    uId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentDeregistrationPeriod(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetAssessmentDeregistrationPeriodResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getAssessmentIdsToCourseId(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentMaxPoints(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentMinPoints(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentRegistrantIds(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentRegistrationPeriod(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetAssessmentRegistrationPeriodResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentTime(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentType(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getAssessmentsToCourseId(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getCourseIdToAssessmentId(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  isAssessmentRegistrationRequired(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param uId Type: uint256, Indexed: false
   */
  removeRegistrantFromAssessment(
    assessmentId: BigNumberish,
    uId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
