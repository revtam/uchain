import { Box, Button, Container } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useUserControllerContract, useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { alertError, handleTransactionCall, rerenderOnReturn } from "../utils/contract/contractUtils";
import { Profile } from "../utils/converter/internal-types/internalTypes";
import { useRerender } from "../hooks/common/commonHooks";
import CenterContent from "../components/data-display/CenterContent";
import ProfileData from "../components/data-display/ProfileData";
import useAuthStore from "../hooks/auth/authHooks";
import { convertToProfileInternal } from "../utils/converter/profileConverter";
import PageTitle from "../components/data-display/PageTitle";
import DataTable from "../components/data-display/DataTable";
import PageLoading from "../components/PageLoading";
import { LOG_IN, NOT_REGISTERED } from "../constants/authMessages";

const ProfilePage: React.FunctionComponent<any> = () => {
    const { active, account, library } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { registered } = useAuthStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();

    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [balance, setBalance] = useState<string>("");
    const [renderState, updateRenderState] = useState<{}>();
    const rerenderOnTransaction = useRerender(updateRenderState);

    useEffect(() => {
        (async () => {
            if (userViewContract && registered) {
                const profile = await alertError(() => userViewContract.getProfile(), setErrorMessage);
                setProfile(convertToProfileInternal(profile));
            }
        })();
    }, [userViewContract, registered, renderState]);

    useEffect(() => {
        (async () => {
            if (account && library) {
                setBalance((await library.getBalance(account)).toString());
            }
        })();
    }, [account, library]);

    if (!active) return <CenterContent content={LOG_IN} />;

    if (registered === false) return <CenterContent content={NOT_REGISTERED} />;

    if (profile && account)
        return (
            <Container maxWidth={"lg"} sx={{ mb: 10 }}>
                <PageTitle title={"Profile"} />
                <ProfileData registration={profile} />
                <Box marginTop={4}>
                    {
                        <DataTable
                            rows={[
                                {
                                    title: "Wallet address:",
                                    value: account,
                                },
                                { title: "Balance:", value: balance },
                            ]}
                        />
                    }
                    <Button
                        type={"submit"}
                        color={"primary"}
                        variant="contained"
                        sx={{ mt: 2, py: 1, px: 4, fontWeight: 600 }}
                        onClick={async () =>
                            await alertError(
                                () =>
                                    rerenderOnReturn(
                                        () =>
                                            handleTransactionCall(() =>
                                                userControllerContract.requestExtraTokens()
                                            ),
                                        rerenderOnTransaction
                                    ),
                                setErrorMessage
                            )
                        }
                    >
                        Request tokens
                    </Button>
                </Box>
            </Container>
        );

    return <PageLoading />;
};

export default ProfilePage;
