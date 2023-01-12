import axios from "axios";
import { REGISTRATION_ENDPOINT, REGSERVER_BASE_URL } from "../constants/constants";
import { RegistrationPayload } from "../utils/converter/server-types/payloadTypes";

class RegistrationService {
    register(registrationData: RegistrationPayload) {
        return axios.post(`${REGSERVER_BASE_URL}/${REGISTRATION_ENDPOINT}`, registrationData);
    }
}

export default RegistrationService;
