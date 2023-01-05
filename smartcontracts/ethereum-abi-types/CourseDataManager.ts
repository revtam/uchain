import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CourseDataManager,
  CourseDataManagerMethodNames,
  CourseDataManagerEventsContext,
  CourseDataManagerEvents
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
export type CourseDataManagerEvents = undefined;
export interface CourseDataManagerEventsContext {}
export type CourseDataManagerMethodNames =
  | 'new'
  | 'addLecturers'
  | 'addParticipantToCourse'
  | 'addStudyPrograms'
  | 'createCourse'
  | 'getAllCourseCodes'
  | 'getAllCourses'
  | 'getCourse'
  | 'getCourseDeregistrationPeriod'
  | 'getCourseIdsToCourseCode'
  | 'getCourseMaxPlaces'
  | 'getCourseParticipantIds'
  | 'getCourseRegistrationPeriod'
  | 'getCourseType'
  | 'getCoursesToCourseIds'
  | 'getCoursesToLecturer'
  | 'getCoursesToProgramId'
  | 'getCoursesToStudent'
  | 'getGradeLevels'
  | 'getLecturerUIdsOfCourseId'
  | 'getRequirementCourseCodesOfCourse'
  | 'getStudyProgramIdsOfCourse'
  | 'removeParticipantFromCourse';
export interface SemesterRequest {
  year: BigNumberish;
  season: BigNumberish;
}
export interface ClassesRequest {
  datetime: BigNumberish;
  place: string;
}
export interface GradeLevelsRequest {
  grade: BigNumberish;
  minPercentage: BigNumberish;
}
export interface CreateCourseRequest {
  title: string;
  code: string;
  courseType: BigNumberish;
  semester: SemesterRequest;
  description: string;
  examTopics: string;
  language: string;
  ects: BigNumberish;
  maxPlaces: BigNumberish;
  registrationStart: BigNumberish;
  registrationDeadline: BigNumberish;
  deregistrationDeadline: BigNumberish;
  classes: ClassesRequest[];
  gradeLevels: GradeLevelsRequest[];
  requirementCourseCodes: string[];
}
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
export interface ContentResponse {
  title: string;
  0: ContentResponse;
  code: string;
  1: ContentResponse;
  courseType: number;
  2: ContentResponse;
  semester: SemesterResponse;
  3: ContentResponse;
  description: string;
  4: ContentResponse;
  examTopics: string;
  5: ContentResponse;
  language: string;
  6: ContentResponse;
  ects: BigNumber;
  7: ContentResponse;
  maxPlaces: BigNumber;
  8: ContentResponse;
  registrationStart: BigNumber;
  9: ContentResponse;
  registrationDeadline: BigNumber;
  10: ContentResponse;
  deregistrationDeadline: BigNumber;
  11: ContentResponse;
  classes: ClassesResponse[];
  12: ContentResponse;
  gradeLevels: GradeLevelsResponse[];
  13: ContentResponse;
  requirementCourseCodes: string[];
  14: ContentResponse;
}
export interface CourseResponse {
  courseId: BigNumber;
  0: BigNumber;
  content: ContentResponse;
  1: ContentResponse;
}
export interface GetCourseDeregistrationPeriodResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface GetCourseRegistrationPeriodResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface GradelevelResponse {
  grade: BigNumber;
  0: BigNumber;
  minPercentage: BigNumber;
  1: BigNumber;
}
export interface CourseDataManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param courseDataStorageAddress Type: address, Indexed: false
   * @param accessWhitelistAddress Type: address, Indexed: false
   */
  'new'(
    courseDataStorageAddress: string,
    accessWhitelistAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param lecturerUIds Type: uint256[], Indexed: false
   */
  addLecturers(
    courseId: BigNumberish,
    lecturerUIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param uId Type: uint256, Indexed: false
   */
  addParticipantToCourse(
    courseId: BigNumberish,
    uId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studyProgramIds Type: uint256[], Indexed: false
   */
  addStudyPrograms(
    courseId: BigNumberish,
    studyProgramIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseContent Type: tuple, Indexed: false
   */
  createCourse(
    courseContent: CreateCourseRequest,
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
   * @param courseId Type: uint256, Indexed: false
   */
  getCourseDeregistrationPeriod(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetCourseDeregistrationPeriodResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseCode Type: string, Indexed: false
   */
  getCourseIdsToCourseCode(
    courseCode: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getCourseMaxPlaces(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getCourseParticipantIds(
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
  getCourseRegistrationPeriod(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetCourseRegistrationPeriodResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getCourseType(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseIds Type: uint256[], Indexed: false
   */
  getCoursesToCourseIds(
    courseIds: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   */
  getCoursesToLecturer(
    uId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param programId Type: uint256, Indexed: false
   */
  getCoursesToProgramId(
    programId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param uId Type: uint256, Indexed: false
   */
  getCoursesToStudent(
    uId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getGradeLevels(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GradelevelResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getLecturerUIdsOfCourseId(
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
  getRequirementCourseCodesOfCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
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
   * @param uId Type: uint256, Indexed: false
   */
  removeParticipantFromCourse(
    courseId: BigNumberish,
    uId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
