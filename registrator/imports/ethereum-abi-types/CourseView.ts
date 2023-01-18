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
  | 'getAssessment'
  | 'getAssessmentParticipants'
  | 'getAssessmentsToCourseId'
  | 'getCourse'
  | 'getCourseParticipants'
  | 'getCourseParticipantsNumber'
  | 'getCoursesLecturingAt'
  | 'getLecturersAtCourse'
  | 'getRegisteredAssessments'
  | 'getRegisteredAssessmentsOfStudent'
  | 'getRegisteredCourses'
  | 'isRegisteredAtCourse'
  | 'isRegisteredToAssessment';
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
export interface AssessmentContentResponse {
  title: string;
  0: AssessmentContentResponse;
  datetime: BigNumber;
  1: AssessmentContentResponse;
  place: string;
  2: AssessmentContentResponse;
  assessmentType: number;
  3: AssessmentContentResponse;
  maxPoints: BigNumber;
  4: AssessmentContentResponse;
  minPoints: BigNumber;
  5: AssessmentContentResponse;
  isRegistrationRequired: boolean;
  6: AssessmentContentResponse;
  registrationStart: BigNumber;
  7: AssessmentContentResponse;
  registrationDeadline: BigNumber;
  8: AssessmentContentResponse;
  deregistrationDeadline: BigNumber;
  9: AssessmentContentResponse;
}
export interface AssessmentResponse {
  assessmentId: BigNumber;
  0: BigNumber;
  assessmentContent: AssessmentContentResponse;
  1: AssessmentContentResponse;
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
  getAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse>;
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
   * @param courseId Type: uint256, Indexed: false
   */
  getAssessmentsToCourseId(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse[]>;
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
  getCourseParticipants(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getCourseParticipantsNumber(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   * @param courseId Type: uint256, Indexed: false
   */
  getLecturersAtCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  getRegisteredAssessments(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  getRegisteredAssessmentsOfStudent(
    courseId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<AssessmentResponse[]>;
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
   * @param courseId Type: uint256, Indexed: false
   */
  isRegisteredAtCourse(
    courseId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  isRegisteredToAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
