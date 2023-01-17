import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../components/forms/RegistrationForm";
import LoadingBox from "../../components/LoadingBox";
import ProfileData from "../../components/data-display/data/base-components/ProfileData";
import { RegistrationStatus } from "../../utils/converter/contract-types/enums";
import useAuthStore from "../../hooks/auth/authHooks";
import { useUserControllerContract, useUserViewContract } from "../../hooks/contract/contractHooks";
import useErrorStore from "../../hooks/error/errorHooks";
import { getNormalizedEnumKey } from "../../utils/common/commonUtils";
import { alertError, alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import { Profile } from "../../utils/converter/internal-types/internalTypes";
import {
    convertRegistrationToProfileInternal,
    convertToRegistrationStatusInternal,
} from "../../utils/converter/registrationConverter";
import { useRerender } from "../../hooks/common/commonHooks";
import PageTemplate from "../../components/data-display/PageTemplate";
import CenterContent from "../../components/data-display/CenterContent";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { LOG_IN } from "../../constants/authMessages";

const RegistrationPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { registered, callReauthorize } = useAuthStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();
    const { renderState, updateRenderState } = useRerender();

    const [registrationPending, setRegistrationPending] = useState<boolean | undefined>(undefined);
    const [registration, setRegistration] = useState<Profile | undefined>(undefined);
    const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | undefined>(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                setRegistrationPending(
                    await alertError(() => userViewContract.isUserRegistrationPending(), setErrorMessage)
                );
            }
        })();
    }, [userViewContract, renderState]);

    useEffect(() => {
        (async () => {
            if (userViewContract && registrationPending) {
                const registrationResponse = await alertError(
                    () => userViewContract.getPendingRegistration(),
                    setErrorMessage
                );
                setRegistration(convertRegistrationToProfileInternal(registrationResponse));
                setRegistrationStatus(convertToRegistrationStatusInternal(registrationResponse));
            }
        })();
    }, [userViewContract, registrationPending]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered) return <CenterContent>You are registered</CenterContent>;

    if (registrationPending === false)
        return (
            <PageTemplate pageTitle="Registration">
                <RegistrationForm updatePending={updateRenderState} />
            </PageTemplate>
        );

    if (registrationPending === undefined || !registration || registrationStatus === undefined)
        return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Registration">
            <ProfileData profile={registration} />
            <Box marginTop={5}>
                Status:
                <Typography display={"inline"} marginLeft={2} fontWeight={600}>
                    {getNormalizedEnumKey(registrationStatus, RegistrationStatus).toUpperCase()}
                </Typography>
            </Box>
            {registrationStatus !== RegistrationStatus.UNDER_REVIEW && (
                <React.Fragment>
                    <Button
                        color={"primary"}
                        variant="contained"
                        sx={{ mt: 3, py: 1, px: 4, fontWeight: 600 }}
                        onClick={async () => {
                            setSendDisabled(true);
                            alertErrorRerenderTransactionCall(
                                () => userControllerContract.acknowledgeRegistrationResult(),
                                callReauthorize,
                                setErrorMessage
                            ).finally(() => setSendDisabled(false));
                        }}
                        disabled={sendDisabled}
                    >
                        {sendDisabled ? <LoadingBox /> : "Accept"}
                    </Button>
                    <Typography marginTop={2}>
                        You have to confirm that you acknowledged the result of your registration request. If
                        it was rejected, you may reapply.
                    </Typography>
                </React.Fragment>
            )}
        </PageTemplate>
    );
};

export default RegistrationPage;
