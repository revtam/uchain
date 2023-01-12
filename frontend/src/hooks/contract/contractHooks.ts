import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { getContract } from "../../utils/contract/contractUtils";
import abis from "../../contracts/abis";
import { ContractContext as UserView } from "../../contracts/imports/ethereum-abi-types/UserView";
import { ADDRESSES } from "../../constants/constants";
import { CourseController } from "../../contracts/imports/ethereum-abi-types/CourseController";
import { PerformanceController } from "../../contracts/imports/ethereum-abi-types/PerformanceController";
import { StudyProgramController } from "../../contracts/imports/ethereum-abi-types/StudyProgramController";
import { UserController } from "../../contracts/imports/ethereum-abi-types/UserController";
import { CourseView } from "../../contracts/imports/ethereum-abi-types/CourseView";
import { StudyProgramView } from "../../contracts/imports/ethereum-abi-types/StudyProgramView";
import { PerformanceView } from "../../contracts/imports/ethereum-abi-types/PerformanceView";

export const useContract = (address: string, abi: any, withSignerIfPossible = true): Contract | null => {
    const { library, account, chainId } = useWeb3React<Web3Provider>();

    return useMemo(() => {
        if (!address || !abi || !library || !chainId) return null;
        try {
            return getContract(address, abi, library, withSignerIfPossible && account ? account : undefined);
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, abi, library, chainId, withSignerIfPossible, account]);
};

export const useCourseControllerContract = (): CourseController => {
    return useContract(ADDRESSES.courseController, abis.courseController) as unknown as CourseController;
};

export const usePerformanceControllerContract = (): PerformanceController => {
    return useContract(
        ADDRESSES.performanceController,
        abis.performanceController
    ) as unknown as PerformanceController;
};

export const useStudyProgramControllerContract = (): StudyProgramController => {
    return useContract(
        ADDRESSES.studyProgramController,
        abis.studyProgramController
    ) as unknown as StudyProgramController;
};

export const useUserControllerContract = (): UserController => {
    return useContract(ADDRESSES.userController, abis.userController) as unknown as UserController;
};

export const useCourseViewContract = (): CourseView => {
    return useContract(ADDRESSES.courseView, abis.courseView) as unknown as CourseView;
};

export const useStudyProgramViewContract = (): StudyProgramView => {
    return useContract(ADDRESSES.studyProgramView, abis.studyProgramView) as unknown as StudyProgramView;
};

export const usePerformanceViewContract = (): PerformanceView => {
    return useContract(ADDRESSES.performanceView, abis.performanceView) as unknown as PerformanceView;
};

export const useUserViewContract = (): UserView => {
    return useContract(ADDRESSES.userView, abis.userView) as unknown as UserView;
};
