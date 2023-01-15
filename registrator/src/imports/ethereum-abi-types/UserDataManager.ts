import {
    ContractTransaction,
    ContractInterface,
    BytesLike as Arrayish,
    BigNumber,
    BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
    UserDataManager,
    UserDataManagerMethodNames,
    UserDataManagerEventsContext,
    UserDataManagerEvents
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
export type UserDataManagerEvents = undefined;
export interface UserDataManagerEventsContext {}
export type UserDataManagerMethodNames =
    | "new"
    | "createUser"
    | "getAllUsers"
    | "getEnrolledProgramIds"
    | "getProfile"
    | "getUIdToAddress"
    | "getUser"
    | "getUserName"
    | "getUserRoleAtAddress"
    | "getUserRoleAtUId"
    | "getUsers"
    | "isAddressRegistered";
export interface ProfileRequestRequest {
    year: BigNumberish;
    month: BigNumberish;
    day: BigNumberish;
}
export interface CreateUserRequest {
    userAddress: string;
    status: BigNumberish;
    profile: ProfileRequestRequest;
}
export interface DateOfBirthResponse {
    year: BigNumber;
    0: BigNumber;
    month: BigNumber;
    1: BigNumber;
    day: BigNumber;
    2: BigNumber;
}
export interface ProfileResponse {
    firstName: string;
    0: ProfileResponse;
    lastName: string;
    1: ProfileResponse;
    gender: number;
    2: ProfileResponse;
    dateOfBirth: DateOfBirthResponse;
    3: ProfileResponse;
    nationality: string;
    4: ProfileResponse;
    phoneNumber: string;
    5: ProfileResponse;
    emailAddress: string;
    6: ProfileResponse;
    role: number;
    7: ProfileResponse;
    studyProgramIds: BigNumber[];
    8: ProfileResponse;
}
export interface UserResponse {
    uId: BigNumber;
    0: BigNumber;
    profile: ProfileResponse;
    1: ProfileResponse;
}
export interface UserprofileResponse {
    firstName: string;
    0: string;
    lastName: string;
    1: string;
    gender: number;
    2: number;
    dateOfBirth: DateOfBirthResponse;
    3: DateOfBirthResponse;
    nationality: string;
    4: string;
    phoneNumber: string;
    5: string;
    emailAddress: string;
    6: string;
    role: number;
    7: number;
    studyProgramIds: BigNumber[];
    8: BigNumber[];
}
export interface GetUserNameResponse {
    result0: string;
    0: string;
    result1: string;
    1: string;
    length: 2;
}
export interface UserDataManager {
    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: constructor
     * @param userStorageAddress Type: address, Indexed: false
     * @param accessWhitelistAddress Type: address, Indexed: false
     */
    "new"(
        userStorageAddress: string,
        accessWhitelistAddress: string,
        overrides?: ContractTransactionOverrides
    ): Promise<ContractTransaction>;
    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     * @param registration Type: tuple, Indexed: false
     */
    createUser(
        registration: CreateUserRequest,
        overrides?: ContractTransactionOverrides
    ): Promise<ContractTransaction>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    getAllUsers(overrides?: ContractCallOverrides): Promise<UserResponse[]>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uId Type: uint256, Indexed: false
     */
    getEnrolledProgramIds(uId: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber[]>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uId Type: uint256, Indexed: false
     */
    getProfile(uId: BigNumberish, overrides?: ContractCallOverrides): Promise<UserprofileResponse>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param userAddress Type: address, Indexed: false
     */
    getUIdToAddress(userAddress: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uId Type: uint256, Indexed: false
     */
    getUser(uId: BigNumberish, overrides?: ContractCallOverrides): Promise<UserResponse>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uId Type: uint256, Indexed: false
     */
    getUserName(uId: BigNumberish, overrides?: ContractCallOverrides): Promise<GetUserNameResponse>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param userAddress Type: address, Indexed: false
     */
    getUserRoleAtAddress(userAddress: string, overrides?: ContractCallOverrides): Promise<number>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uId Type: uint256, Indexed: false
     */
    getUserRoleAtUId(uId: BigNumberish, overrides?: ContractCallOverrides): Promise<number>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param uIds Type: uint256[], Indexed: false
     */
    getUsers(uIds: BigNumberish[], overrides?: ContractCallOverrides): Promise<UserResponse[]>;
    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param _address Type: address, Indexed: false
     */
    isAddressRegistered(_address: string, overrides?: ContractCallOverrides): Promise<boolean>;
}
