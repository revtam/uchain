import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CourseDataStorage,
  CourseDataStorageMethodNames,
  CourseDataStorageEventsContext,
  CourseDataStorageEvents
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
export type CourseDataStorageEvents = undefined;
export interface CourseDataStorageEventsContext {}
export type CourseDataStorageMethodNames =
  | 'new'
  | 'getAllCourseCodes'
  | 'getAllCourses'
  | 'getCourse'
  | 'getCourseIdsByCode'
  | 'getCourseIdsOfLecturer'
  | 'getCourseIdsOfParticipant'
  | 'getCourseIdsOfStudyProgram'
  | 'getLecturerIdsOfCourse'
  | 'getParticipantIdsOfCourse'
  | 'getStudyProgramIdsOfCourse'
  | 'removeLecturer'
  | 'removeParticipant'
  | 'storeCourse'
  | 'storeLecturer'
  | 'storeParticipant'
  | 'storeStudyProgram';
export interface SemesterResponse {
  year: BigNumber;
  0: BigNumber;
  season: number;
  1: number;
}
export interface ClassesResponse {
  datetime: BigNumber;
  0: BigNumber;
  place: string;
  1: string;
}
export interface GradeLevelsResponse {
  grade: BigNumber;
  0: BigNumber;
  minPercentage: BigNumber;
  1: BigNumber;
}
export interface CourseContentResponse {
  title: string;
  0: CourseContentResponse;
  code: string;
  1: CourseContentResponse;
  courseType: number;
  2: CourseContentResponse;
  semester: SemesterResponse;
  3: CourseContentResponse;
  description: string;
  4: CourseContentResponse;
  examTopics: string;
  5: CourseContentResponse;
  language: string;
  6: CourseContentResponse;
  ects: BigNumber;
  7: CourseContentResponse;
  maxPlaces: BigNumber;
  8: CourseContentResponse;
  registrationStart: BigNumber;
  9: CourseContentResponse;
  registrationDeadline: BigNumber;
  10: CourseContentResponse;
  deregistrationDeadline: BigNumber;
  11: CourseContentResponse;
  classes: ClassesResponse[];
  12: CourseContentResponse;
  gradeLevels: GradeLevelsResponse[];
  13: CourseContentResponse;
  requirementCourseCodes: string[];
  14: CourseContentResponse;
}
export interface CourseResponse {
  courseId: BigNumber;
  0: BigNumber;
  courseContent: CourseContentResponse;
  1: CourseContentResponse;
}
export interface CourseContentRequestRequest {
  year: BigNumberish;
  season: BigNumberish;
}
export interface StoreCourseRequest {
  courseId: BigNumberish;
  courseContent: CourseContentRequest;
}
export interface CourseDataStorage {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    accessWhitelistAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllCourseCodes(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllCourses(overrides?: ContractCallOverrides): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param code Type: string, Indexed: false
   */
  getCourseIdsByCode(
    code: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param lecturerUId Type: uint256, Indexed: false
   */
  getCourseIdsOfLecturer(
    lecturerUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param participantUId Type: uint256, Indexed: false
   */
  getCourseIdsOfParticipant(
    participantUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param programId Type: uint256, Indexed: false
   */
  getCourseIdsOfStudyProgram(
    programId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getLecturerIdsOfCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getParticipantIdsOfCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getStudyProgramIdsOfCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param lecturerUId Type: uint256, Indexed: false
   */
  removeLecturer(
    courseId: BigNumberish,
    lecturerUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param participantUId Type: uint256, Indexed: false
   */
  removeParticipant(
    courseId: BigNumberish,
    participantUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param course Type: tuple, Indexed: false
   */
  storeCourse(
    course: StoreCourseRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param lecturerUId Type: uint256, Indexed: false
   */
  storeLecturer(
    courseId: BigNumberish,
    lecturerUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param participantUId Type: uint256, Indexed: false
   */
  storeParticipant(
    courseId: BigNumberish,
    participantUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param programId Type: uint256, Indexed: false
   */
  storeStudyProgram(
    courseId: BigNumberish,
    programId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
