import React, { useEffect, useState } from "react";
import { useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertError } from "../utils/contract/contractUtils";
import { UserRole } from "../types/contract-types/enums";
import { getNormalizedEnumKey } from "../utils/common/commonUtils";
import CenterContent from "../components/data-display/CenterContent";
import { Name } from "../types/internal-types/internalTypes";
import { convertToNameInternal } from "../utils/converter/profileConverter";
import useAuthStore from "../hooks/auth/authHooks";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN } from "../constants/authMessages";
import pageRoutes from "../constants/pagesRoutes";
import { Link } from "react-router-dom";
import { variables } from "../theme/theme";

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

    if (registered === false)
        return (
            <CenterContent>
                <Link
                    to={`/${pageRoutes.registration}`}
                    style={{ color: variables.black, textDecoration: "none" }}
                >
                    Click here to register
                </Link>
            </CenterContent>
        );

    if (name && userRole !== undefined) {
        return (
            <CenterContent>
                Logged in as {name.firstName} {name.lastName} - {getNormalizedEnumKey(userRole, UserRole)}
            </CenterContent>
        );
    }

    return <LoadingBox fullSize />;
};

export default Home;
