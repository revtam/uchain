import { ContractAbis } from "./types";
import deployerJson from "./imports/artifacts/contracts/Deployer.sol/Deployer.json";
import courseControllerJson from "./imports/artifacts/contracts/logic/CourseController.sol/CourseController.json";
import performanceControllerJson from "./imports/artifacts/contracts/logic/PerformanceController.sol/PerformanceController.json";
import studyProgramControllerJson from "./imports/artifacts/contracts/logic/StudyProgramController.sol/StudyProgramController.json";
import userControllerJson from "./imports/artifacts/contracts/logic/UserController.sol/UserController.json";
import courseViewJson from "./imports/artifacts/contracts/view/CourseView.sol/CourseView.json";
import studyProgramViewJson from "./imports/artifacts/contracts/view/StudyProgramView.sol/StudyProgramView.json";
import performanceViewJson from "./imports/artifacts/contracts/view/PerformanceView.sol/PerformanceView.json";
import userViewJson from "./imports/artifacts/contracts/view/UserView.sol/UserView.json";

const abis: ContractAbis = {
    deployer: deployerJson.abi,

    courseController: courseControllerJson.abi,
    performanceController: performanceControllerJson.abi,
    studyProgramController: studyProgramControllerJson.abi,
    userController: userControllerJson.abi,

    courseView: courseViewJson.abi,
    studyProgramView: studyProgramViewJson.abi,
    performanceView: performanceViewJson.abi,
    userView: userViewJson.abi,
};

export default abis;
