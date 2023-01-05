import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CourseView,
  CourseViewMethodNames,
  CourseViewEventsContext,
  CourseViewEvents
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
export type CourseViewEvents = undefined;
export interface CourseViewEventsContext {}
export type CourseViewMethodNames =
  | 'new'
  | 'getAllCourseCodes'
  | 'getAllCourses'
  | 'getAssessmentParticipants'
  | 'getCoursesLecturingAt'
  | 'getCoursesToCourseCode'
  | 'getCoursesToStudyProgram'
  | 'getRegisteredCourses'
  | 'getRegisteredCoursesOfStudent';
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
export interface CourseView {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param userDataManagerAddress Type: address, Indexed: false
   * @param courseDataManagerAddress Type: address, Indexed: false
   * @param assessmentDataManagerAddress Type: address, Indexed: false
   */
  'new'(
    userDataManagerAddress: string,
    courseDataManagerAddress: string,
    assessmentDataManagerAddress: string,
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
   * @param assessmentId Type: uint256, Indexed: false
   */
  getAssessmentParticipants(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCoursesLecturingAt(
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param code Type: string, Indexed: false
   */
  getCoursesToCourseCode(
    code: string,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param programId Type: uint256, Indexed: false
   */
  getCoursesToStudyProgram(
    programId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getRegisteredCourses(
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param studentUId Type: uint256, Indexed: false
   */
  getRegisteredCoursesOfStudent(
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CourseResponse[]>;
}
