import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  StudyProgramView,
  StudyProgramViewMethodNames,
  StudyProgramViewEventsContext,
  StudyProgramViewEvents
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
export type StudyProgramViewEvents = undefined;
export interface StudyProgramViewEventsContext {}
export type StudyProgramViewMethodNames =
  | 'new'
  | 'getAllPrograms'
  | 'getEnrolledPrograms'
  | 'getProgram'
  | 'getStudyProgramsToCourseId';
export interface StudyprogramResponse {
  programId: BigNumber;
  0: BigNumber;
  programName: string;
  1: string;
}
export interface StudyProgramView {
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
   */
  getAllPrograms(
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getEnrolledPrograms(
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param programId Type: uint256, Indexed: false
   */
  getProgram(
    programId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getStudyProgramsToCourseId(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse[]>;
}
