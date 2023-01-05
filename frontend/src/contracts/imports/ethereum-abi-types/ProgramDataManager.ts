import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  ProgramDataManager,
  ProgramDataManagerMethodNames,
  ProgramDataManagerEventsContext,
  ProgramDataManagerEvents
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
export type ProgramDataManagerEvents = undefined;
export interface ProgramDataManagerEventsContext {}
export type ProgramDataManagerMethodNames =
  | 'new'
  | 'createStudyProgram'
  | 'getAllStudyPrograms'
  | 'getStudyProgram';
export interface StudyprogramResponse {
  programId: BigNumber;
  0: BigNumber;
  programName: string;
  1: string;
}
export interface ProgramDataManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param programStorageAddress Type: address, Indexed: false
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    programStorageAddress: string,
    accessWhitelistAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param programName Type: string, Indexed: false
   */
  createStudyProgram(
    programName: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllStudyPrograms(
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param programId Type: uint256, Indexed: false
   */
  getStudyProgram(
    programId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<StudyprogramResponse>;
}
