import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AssessmentRegistrationStorage,
  AssessmentRegistrationStorageMethodNames,
  AssessmentRegistrationStorageEventsContext,
  AssessmentRegistrationStorageEvents
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
export type AssessmentRegistrationStorageEvents = undefined;
export interface AssessmentRegistrationStorageEventsContext {}
export type AssessmentRegistrationStorageMethodNames =
  | 'getAssessmentIdsOfRegistrant'
  | 'getRegistrantIdsOfAssessment'
  | 'removeRegistrant'
  | 'storeRegistrant';
export interface AssessmentRegistrationStorage {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param registrantUId Type: uint256, Indexed: false
   */
  getAssessmentIdsOfRegistrant(
    registrantUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  getRegistrantIdsOfAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param registrantUId Type: uint256, Indexed: false
   */
  removeRegistrant(
    assessmentId: BigNumberish,
    registrantUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   * @param registrantUId Type: uint256, Indexed: false
   */
  storeRegistrant(
    assessmentId: BigNumberish,
    registrantUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
