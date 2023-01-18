import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CourseController,
  CourseControllerMethodNames,
  CourseControllerEventsContext,
  CourseControllerEvents
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
export type CourseControllerEvents = undefined;
export interface CourseControllerEventsContext {}
export type CourseControllerMethodNames =
  | 'new'
  | 'addStudentToCourse'
  | 'createNewCourse'
  | 'deregisterFromAssessment'
  | 'deregisterFromCourse'
  | 'registerToAssessment'
  | 'registerToCourse'
  | 'removeStudentFromCourse';
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
export interface CreateNewCourseRequest {
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
export interface CourseController {
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  addStudentToCourse(
    courseId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseContent Type: tuple, Indexed: false
   * @param assessmentContents Type: tuple[], Indexed: false
   * @param lecturerUIds Type: uint256[], Indexed: false
   * @param studyProgramIds Type: uint256[], Indexed: false
   */
  createNewCourse(
    courseContent: CreateNewCourseRequest,
    assessmentContents: CreateNewCourseRequest[],
    lecturerUIds: BigNumberish[],
    studyProgramIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  deregisterFromAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  deregisterFromCourse(
    courseId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assessmentId Type: uint256, Indexed: false
   */
  registerToAssessment(
    assessmentId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   */
  registerToCourse(
    courseId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param courseId Type: uint256, Indexed: false
   * @param studentUId Type: uint256, Indexed: false
   */
  removeStudentFromCourse(
    courseId: BigNumberish,
    studentUId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
