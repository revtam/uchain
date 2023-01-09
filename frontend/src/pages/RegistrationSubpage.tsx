import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../components/forms/RegistrationForm";
import LoadingBox from "../components/LoadingBox";
import ProfileData from "../components/data-display/object-data/ProfileData";
import { RegistrationStatus } from "../utils/converter/contract-types/enums";
import useAuthStore from "../hooks/auth/authHooks";
import { useUserControllerContract, useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { getNormalizedEnumKey } from "../utils/common/commonUtils";
import { alertError, alertErrorRerenderTransactionCall } from "../utils/contract/contractUtils";
import { Profile } from "../utils/converter/internal-types/internalTypes";
import {
    convertToRegistrationInternal,
    convertToRegistrationStatusInternal,
} from "../utils/converter/registrationConverter";
import { useRerender } from "../hooks/common/commonHooks";

const RegistrationSubpage: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();
    const { callReauthorize } = useAuthStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();
    const { renderState, updateRenderState } = useRerender();

    const [registrationPending, setRegistrationPending] = useState<boolean | undefined>(undefined);
    const [registration, setRegistration] = useState<Profile | undefined>(undefined);
    const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | undefined>(undefined);

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
                setRegistration(convertToRegistrationInternal(registrationResponse));
                setRegistrationStatus(convertToRegistrationStatusInternal(registrationResponse));
            }
        })();
    }, [userViewContract, registrationPending]);

    if (registrationPending === false) return <RegistrationForm updatePending={updateRenderState} />;

    if (registrationPending) {
        return (
            <React.Fragment>
                {registration && <ProfileData registration={registration} />}
                {registrationStatus !== undefined && (
                    <Box marginTop={5}>
                        Status:
                        <Typography display={"inline"} marginLeft={2} fontWeight={600}>
                            {getNormalizedEnumKey(registrationStatus, RegistrationStatus).toUpperCase()}
                        </Typography>
                    </Box>
                )}
                <Button
                    color={"primary"}
                    variant="contained"
                    sx={{ mt: 3, py: 1, px: 4, fontWeight: 600 }}
                    onClick={async () =>
                        await alertErrorRerenderTransactionCall(
                            () => userControllerContract.acknowledgeRegistrationResult(),
                            callReauthorize,
                            setErrorMessage
                        )
                    }
                >
                    Accept
                </Button>
                <Typography marginTop={2}>
                    You have to confirm that you acknowledged the result of your registration request. If it
                    was rejected, you may reapply.
                </Typography>
            </React.Fragment>
        );
    }

    return <LoadingBox />;
};

export default RegistrationSubpage;
