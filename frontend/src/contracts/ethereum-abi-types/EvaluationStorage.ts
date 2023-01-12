import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  EvaluationStorage,
  EvaluationStorageMethodNames,
  EvaluationStorageEventsContext,
  EvaluationStorageEvents
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
export type EvaluationStorageEvents = undefined;
export interface EvaluationStorageEventsContext {}
export type EvaluationStorageMethodNames =
  | 'getEvaluation'
  | 'getEvaluationIfSet'
  | 'storeEvaluation';
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
export interface StoreEvaluationRequest {
  isSet: boolean;
  datetime: BigNumberish;
  achievedPoints: BigNumberish;
  feedback: string;
  lecturerUId: BigNumberish;
}
export interface EvaluationStorage {
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
}
