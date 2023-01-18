import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useCallback, useEffect, useState } from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_REGISTERED, NOT_SPM } from "../../constants/authMessages";
import PageTemplate from "../../components/data-display/PageTemplate";
import useAuthStore from "../../hooks/auth/authHooks";
import { RegistrationStatus, UserRole } from "../../types/contract-types/enums";
import { useUserControllerContract, useUserViewContract } from "../../hooks/contract/contractHooks";
import { alertError, alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import {
    convertRegistrationToProfileInternal,
    convertToAddressInternal,
    convertToRegistrationStatusInternal,
} from "../../utils/converter/registrationConverter";
import { Profile } from "../../types/internal-types/internalTypes";
import useErrorStore from "../../hooks/error/errorHooks";
import UserAccordion from "../../components/data-display/accordions/UserAccordion";
import ProfileData from "../../components/data-display/data/base-components/ProfileData";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRerender } from "../../hooks/common/commonHooks";
import { getNormalizedEnumKey } from "../../utils/common/commonUtils";

const RegistrationsPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { userRole, registered } = useAuthStore();
    const { renderState, updateRenderState } = useRerender();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();

    const [pendingRegistrations, setPendingRegistrations] = useState<
        (Profile & { status: RegistrationStatus } & { address: string })[] | undefined
    >(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (!userViewContract) return;
        (async () => {
            setPendingRegistrations(
                (await alertError(() => userViewContract.getPendingRegistrations(), setErrorMessage)).map(
                    (registration) => ({
                        ...convertRegistrationToProfileInternal(registration),
                        status: convertToRegistrationStatusInternal(registration),
                        address: convertToAddressInternal(registration),
                    })
                )
            );
        })();
    }, [userViewContract, renderState]);

    const handleAccept = useCallback(
        (address: string) => {
            if (!userControllerContract) return;
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () => userControllerContract.acceptRegistration(address),
                updateRenderState,
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [userControllerContract, renderState]
    );

    const handleReject = useCallback(
        (address: string) => {
            if (!userControllerContract) return;
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () => userControllerContract.rejectRegistration(address),
                updateRenderState,
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [userControllerContract, renderState]
    );

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.STUDY_PROGRAM_MANAGER)
        return <CenterContent>{NOT_SPM}</CenterContent>;

    if (userRole === undefined || !pendingRegistrations) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Pending registrations">
            {pendingRegistrations.length > 0 ? (
                pendingRegistrations.map((registration, index) => (
                    <UserAccordion
                        user={{
                            id: "",
                            name: { firstName: registration.firstName, lastName: registration.lastName },
                        }}
                        showId={false}
                        key={index}
                    >
                        <Stack spacing={2} alignItems={"baseline"}>
                            {registration.status === RegistrationStatus.UNDER_REVIEW ? (
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        color={"secondary"}
                                        variant="contained"
                                        sx={{ py: 1, px: 4, fontWeight: 600 }}
                                        onClick={() => handleAccept(registration.address)}
                                        disabled={sendDisabled}
                                    >
                                        {sendDisabled ? <LoadingBox /> : "Accept"}
                                    </Button>
                                    <Button
                                        color={"lightGrey"}
                                        variant="contained"
                                        sx={{ py: 1, px: 4, fontWeight: 600 }}
                                        onClick={() => handleReject(registration.address)}
                                        disabled={sendDisabled}
                                    >
                                        {sendDisabled ? <LoadingBox /> : "Reject"}
                                    </Button>
                                </Stack>
                            ) : (
                                <Box>
                                    Status:
                                    <Typography display={"inline"} marginLeft={2} fontWeight={600}>
                                        {getNormalizedEnumKey(registration.status, RegistrationStatus)}
                                    </Typography>
                                </Box>
                            )}
                            <ProfileData profile={registration} />
                        </Stack>
                    </UserAccordion>
                ))
            ) : (
                <CenterContent>No registrations</CenterContent>
            )}
        </PageTemplate>
    );
};

export default RegistrationsPage;
