import { ContractAbis } from "./abiTypes";
import courseControllerJson from "../../imports/artifacts/contracts/CourseController.sol/CourseController.json";
import performanceControllerJson from "../../imports/artifacts/contracts/PerformanceController.sol/PerformanceController.json";
import studyProgramControllerJson from "../../imports/artifacts/contracts/StudyProgramController.sol/StudyProgramController.json";
import userControllerJson from "../../imports/artifacts/contracts/UserController.sol/UserController.json";
import courseViewJson from "../../imports/artifacts/contracts/CourseView.sol/CourseView.json";
import studyProgramViewJson from "../../imports/artifacts/contracts/StudyProgramView.sol/StudyProgramView.json";
import performanceViewJson from "../../imports/artifacts/contracts/PerformanceView.sol/PerformanceView.json";
import userViewJson from "../../imports/artifacts/contracts/UserView.sol/UserView.json";

const abis: ContractAbis = {
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
