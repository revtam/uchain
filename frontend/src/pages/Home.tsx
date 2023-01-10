import React, { useEffect, useState } from "react";
import { useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertError } from "../utils/contract/contractUtils";
import { UserRole } from "../utils/converter/contract-types/enums";
import { getNormalizedEnumKey } from "../utils/common/commonUtils";
import { Container } from "@mui/system";
import PageTitle from "../components/data-display/PageTitle";
import CenterContent from "../components/data-display/CenterContent";
import { Name } from "../utils/converter/internal-types/internalTypes";
import RegistrationSubpage from "./user/RegistrationSubpage";
import { convertToNameInternal } from "../utils/converter/profileConverter";
import useAuthStore from "../hooks/auth/authHooks";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN } from "../constants/authMessages";

const Home: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { registered, userRole } = useAuthStore();

    const userViewContract = useUserViewContract();

    const [name, setName] = useState<Name | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (userViewContract && registered) {
                setName(
                    convertToNameInternal(
                        await alertError(() => userViewContract.getProfile(), setErrorMessage)
                    )
                );
            }
        })();
    }, [userViewContract, registered]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered && name && userRole) {
        return (
            <CenterContent>
                Logged in as {name.firstName} {name.lastName} - {getNormalizedEnumKey(userRole, UserRole)}
            </CenterContent>
        );
    }

    if (registered === false) {
        return (
            <Container maxWidth={"lg"} sx={{ mb: 10 }}>
                <PageTitle title={"Registration"} />
                <RegistrationSubpage />
            </Container>
        );
    }

    return <LoadingBox fullSize />;
};

export default Home;
