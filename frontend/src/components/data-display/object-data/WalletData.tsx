import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import useErrorStore from "../../../hooks/error/errorHooks";
import { useUserControllerContract } from "../../../hooks/contract/contractHooks";
import { useRerender } from "../../../hooks/common/commonHooks";
import { alertErrorRerenderTransactionCall } from "../../../utils/contract/contractUtils";
import DataTable from "../DataTable";
import LoadingBox from "../../LoadingBox";
import TitledTableRow from "../TitledTableRow";

const WalletData: React.FunctionComponent<any> = () => {
    const { account, library } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();

    const userControllerContract = useUserControllerContract();

    const [balance, setBalance] = useState<string>("");
    // const [renderState, updateRenderState] = useState<{}>();
    // const rerenderOnTransaction = useRerender(updateRenderState);
    const { renderState, updateRenderState } = useRerender();

    useEffect(() => {
        (async () => {
            if (account && library) {
                setBalance((await library.getBalance(account)).toString());
            }
        })();
    }, [account, library, renderState]);

    if (!account) return <LoadingBox fullSize={false} />;

    return (
        <React.Fragment>
            <DataTable>
                <TitledTableRow title="Wallet address:">{account}</TitledTableRow>
                <TitledTableRow title="Balance:">{balance} UTOKEN</TitledTableRow>
            </DataTable>
            <Button
                color={"primary"}
                variant="contained"
                sx={{ mt: 2, py: 1, px: 4, fontWeight: 600 }}
                onClick={async () =>
                    await alertErrorRerenderTransactionCall(
                        () => userControllerContract.requestExtraTokens(),
                        updateRenderState,
                        setErrorMessage
                    )
                }
            >
                Request tokens
            </Button>
        </React.Fragment>
    );
};

export default WalletData;
