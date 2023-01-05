import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AssessmentStorage,
  AssessmentStorageMethodNames,
  AssessmentStorageEventsContext,
  AssessmentStorageEvents
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
export type AssessmentStorageEvents = undefined;
export interface AssessmentStorageEventsContext {}
export type AssessmentStorageMethodNames =
  | 'getAssessment'
  | 'getAssessments'
  | 'getCourseIdOfAssessment'
  | 'storeAssessment';
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
export interface ContentRequest {
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
export interface StoreAssessmentRequest {
  assessmentId: BigNumberish;
  content: ContentRequest;
}
export interface AssessmentStorage {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getAssessments(
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
  getCourseIdOfAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param assessment Type: tuple, Indexed: false
   */
  storeAssessment(
    courseId: BigNumberish,
    assessment: StoreAssessmentRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
