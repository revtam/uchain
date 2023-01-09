import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { alertError } from "../utils/contract/contractUtils";
import { Profile } from "../utils/converter/internal-types/internalTypes";
import CenterContent from "../components/data-display/CenterContent";
import ProfileData from "../components/data-display/object-data/ProfileData";
import useAuthStore from "../hooks/auth/authHooks";
import { convertToProfileInternal } from "../utils/converter/profileConverter";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN, NOT_REGISTERED } from "../constants/authMessages";
import PageTemplate from "./PageTemplate";
import WalletData from "../components/data-display/object-data/WalletData";

const ProfilePage: React.FunctionComponent<any> = () => {
    const { active, account } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { registered } = useAuthStore();

    const userViewContract = useUserViewContract();

    const [profile, setProfile] = useState<Profile | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (userViewContract && registered) {
                const profile = await alertError(() => userViewContract.getProfile(), setErrorMessage);
                setProfile(convertToProfileInternal(profile));
            }
        })();
    }, [userViewContract, registered]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (profile && account)
        return (
            <PageTemplate pageTitle="Profile">
                <ProfileData registration={profile} />
                <Box marginTop={4}>
                    <WalletData />
                </Box>
            </PageTemplate>
        );

    return <LoadingBox />;
};

export default ProfilePage;
