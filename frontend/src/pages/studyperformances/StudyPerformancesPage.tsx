import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_LECTURER_OR_STUDENT, NOT_REGISTERED } from "../../constants/authMessages";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import StudyPerformancesStudentSubpage from "./StudentPerformancesSubpage";
import StudyPerformancesLecturerPage from "./LecturerPerformancesSubpage";

const StudyPerformances: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole === undefined) return <LoadingBox fullSize />;

    if (userRole === UserRole.STUDENT) return <StudyPerformancesStudentSubpage />;

    if (userRole === UserRole.LECTURER) return <StudyPerformancesLecturerPage />;

    return <CenterContent>{NOT_LECTURER_OR_STUDENT}</CenterContent>;
};

export default StudyPerformances;
