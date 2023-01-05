import { InjectedConnector } from "@web3-react/injected-connector";

import { CHAIN_ID } from "../../constants/constants";

const injectedConnector = new InjectedConnector({ supportedChainIds: [CHAIN_ID] });

export default injectedConnector;
