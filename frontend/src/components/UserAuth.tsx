import React, { useEffect } from "react";
import useAuthStore from "../hooks/auth/authHooks";
import { useUserControllerContract, useUserViewContract } from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { alertError } from "../utils/contract/contractUtils";
import "./App.css";

export const UserAuth: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();
    const { setRegistered, setUserRole, setAdmin, reauthorized } = useAuthStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                const registered = await alertError(
                    () => userViewContract.isUserRegistered(),
                    setErrorMessage
                );
                setRegistered(registered);
                if (registered) {
                    setUserRole(await alertError(() => userViewContract.getUserRole(), setErrorMessage));
                } else {
                    setUserRole(undefined);
                }
            }
        })();
    }, [userViewContract, reauthorized]);

    useEffect(() => {
        (async () => {
            if (userControllerContract) {
                setAdmin(await alertError(() => userControllerContract.isSenderAdmin(), setErrorMessage));
            }
        })();
    }, [userControllerContract]);

    return null;
};

export default UserAuth;
