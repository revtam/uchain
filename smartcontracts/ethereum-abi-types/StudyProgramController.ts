import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  StudyProgramController,
  StudyProgramControllerMethodNames,
  StudyProgramControllerEventsContext,
  StudyProgramControllerEvents
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
export type StudyProgramControllerEvents = undefined;
export interface StudyProgramControllerEventsContext {}
export type StudyProgramControllerMethodNames =
  | 'new'
  | 'addAdmin'
  | 'addAdminNewStudyProgram'
  | 'addNewStudyProgram'
  | 'batchAddAdmin'
  | 'removeAdmin';
export interface StudyProgramController {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param userDataManagerAddress Type: address, Indexed: false
   * @param programDataManagerAddress Type: address, Indexed: false
   */
  'new'(
    userDataManagerAddress: string,
    programDataManagerAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  addAdmin(
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param programName Type: string, Indexed: false
   */
  addAdminNewStudyProgram(
    programName: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param programName Type: string, Indexed: false
   */
  addNewStudyProgram(
    programName: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param addresses Type: address[], Indexed: false
   */
  batchAddAdmin(
    addresses: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  removeAdmin(
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
