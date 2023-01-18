import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { User } from "../../../types/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface UserAccordionProps {
    user: User;
    showId?: boolean;
}

const UserAccordion: React.FunctionComponent<React.PropsWithChildren<UserAccordionProps>> = ({
    user,
    showId = true,
    children,
}: React.PropsWithChildren<UserAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={`${user.name.firstName} ${user.name.lastName} ${showId ? "- " + user.id : ""}`}
            arrowColor={variables.primary}
            summaryTextColor={variables.black}
            summaryTextWeight={400}
            borderColor={variables.primary}
            borderWidth={2}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default UserAccordion;
