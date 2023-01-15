import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { User } from "../../../utils/converter/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface UserAccordionProps {
    user: User;
}

const UserAccordion: React.FunctionComponent<React.PropsWithChildren<UserAccordionProps>> = ({
    user,
    children,
}: React.PropsWithChildren<UserAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={`${user.name.firstName} ${user.name.lastName} - ${user.id}`}
            arrowColor={variables.primary}
            summaryTextColor={variables.black}
            summaryTextWeight={400}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default UserAccordion;
