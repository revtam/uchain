import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_LECTURER, NOT_REGISTERED } from "../../constants/authMessages";
import PageTemplate from "../../components/data-display/PageTemplate";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import NewCourseForm from "../../components/forms/NewCourseForm";

const NewCoursePage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.LECTURER)
        return <CenterContent>{NOT_LECTURER}</CenterContent>;

    if (userRole === undefined) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Create new course">
            <NewCourseForm />
        </PageTemplate>
    );
};

export default NewCoursePage;
