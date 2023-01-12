import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_REGISTERED, NOT_SPM } from "../../constants/authMessages";
import PageTemplate from "../../components/data-display/PageTemplate";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import NewStudyProgramForm from "../../components/forms/NewStudyProgramForm";

const NewStudyPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.STUDY_PROGRAM_MANAGER)
        return <CenterContent>{NOT_SPM}</CenterContent>;

    if (userRole === undefined) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Create new study program">
            <NewStudyProgramForm />
        </PageTemplate>
    );
};

export default NewStudyPage;
