import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_LECTURER_OR_STUDENT, NOT_REGISTERED } from "../../constants/authMessages";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../types/contract-types/enums";
import ParticipantsPerformancesSubpage from "./ParticipantsPerformancesSubpage";
import MyPerformancesSubpage from "./MyPerformancesSubpage";

const StudyPerformances: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole === undefined) return <LoadingBox fullSize />;

    if (userRole === UserRole.STUDENT) return <MyPerformancesSubpage />;

    if (userRole === UserRole.LECTURER) return <ParticipantsPerformancesSubpage />;

    return <CenterContent>{NOT_LECTURER_OR_STUDENT}</CenterContent>;
};

export default StudyPerformances;
