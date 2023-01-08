export interface ContractAddresses {
    deployer: string;

    courseController: string;
    performanceController: string;
    studyProgramController: string;
    userController: string;

    courseView: string;
    studyProgramView: string;
    performanceView: string;
    userView: string;
}

export interface ContractAbis {
    deployer: object[];

    courseController: object[];
    performanceController: object[];
    studyProgramController: object[];
    userController: object[];

    courseView: object[];
    studyProgramView: object[];
    performanceView: object[];
    userView: object[];
}
