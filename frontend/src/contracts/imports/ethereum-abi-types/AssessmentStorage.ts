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
  | 'getAssessmentIds'
  | 'getCourseIdOfAssessment'
  | 'storeAssessment';
export interface AssessmentContentResponse {
  title: string;
  0: AssessmentContentResponse;
  datetime: BigNumber;
  1: AssessmentContentResponse;
  place: string;
  2: AssessmentContentResponse;
  assessmentType: number;
  3: AssessmentContentResponse;
  maxPoints: BigNumber;
  4: AssessmentContentResponse;
  minPoints: BigNumber;
  5: AssessmentContentResponse;
  isRegistrationRequired: boolean;
  6: AssessmentContentResponse;
  registrationStart: BigNumber;
  7: AssessmentContentResponse;
  registrationDeadline: BigNumber;
  8: AssessmentContentResponse;
  deregistrationDeadline: BigNumber;
  9: AssessmentContentResponse;
}
export interface AssessmentResponse {
  assessmentId: BigNumber;
  0: BigNumber;
  assessmentContent: AssessmentContentResponse;
  1: AssessmentContentResponse;
}
export interface AssessmentContentRequest {
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
  assessmentContent: AssessmentContentRequest;
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
  getAssessmentIds(
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
