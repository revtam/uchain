import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AddressBook,
  AddressBookMethodNames,
  AddressBookEventsContext,
  AddressBookEvents
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
export type AddressBookEvents = undefined;
export interface AddressBookEventsContext {}
export type AddressBookMethodNames =
  | 'addEntries'
  | 'addEntry'
  | 'changeEntry'
  | 'getAddress'
  | 'viewStoredNames';
export interface AddressBook {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _names Type: uint8[], Indexed: false
   * @param addresses Type: address[], Indexed: false
   */
  addEntries(
    _names: BigNumberish[],
    addresses: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: uint8, Indexed: false
   * @param _address Type: address, Indexed: false
   */
  addEntry(
    name: BigNumberish,
    _address: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: uint8, Indexed: false
   * @param newAddress Type: address, Indexed: false
   */
  changeEntry(
    name: BigNumberish,
    newAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param name Type: uint8, Indexed: false
   */
  getAddress(
    name: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  viewStoredNames(overrides?: ContractCallOverrides): Promise<number[]>;
}
