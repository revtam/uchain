import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  SubmissionStorage,
  SubmissionStorageMethodNames,
  SubmissionStorageEventsContext,
  SubmissionStorageEvents
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
export type SubmissionStorageEvents = undefined;
export interface SubmissionStorageEventsContext {}
export type SubmissionStorageMethodNames =
  | 'getSubmission'
  | 'getSubmissionIfSet'
  | 'storeSubmission'
  | 'updateSubmission';
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
export interface StoreSubmissionRequest {
  isSet: boolean;
  submissionDatetime: BigNumberish;
  documentHashes: string[];
}
export interface UpdateSubmissionRequest {
  isSet: boolean;
  submissionDatetime: BigNumberish;
  documentHashes: string[];
}
export interface SubmissionStorage {
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
   * @param submission Type: tuple, Indexed: false
   */
  updateSubmission(
    uId: BigNumberish,
    assessmentId: BigNumberish,
    submission: UpdateSubmissionRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
