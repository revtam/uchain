import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CourseStorage,
  CourseStorageMethodNames,
  CourseStorageEventsContext,
  CourseStorageEvents
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
export type CourseStorageEvents = undefined;
export interface CourseStorageEventsContext {}
export type CourseStorageMethodNames =
  | 'getAllCourseCodes'
  | 'getAllCourses'
  | 'getCourse'
  | 'getCourseIdsByCode'
  | 'storeCourse';
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
export interface CourseStorage {
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param course Type: tuple, Indexed: false
   */
  storeCourse(
    course: StoreCourseRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
