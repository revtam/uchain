import { RegistrationStatus } from "./contract-types/enums";
import { RegistrationResponse } from "../../contracts/imports/ethereum-abi-types/UserView";
import { Profile } from "./internal-types/internalTypes";
import { RegistrationPayload } from "./server-types/payloadTypes";
import { convertToContractDate, convertToDateInternal } from "./basicConverter";

/* Server payload */
export const convertToRegistrationPayload = (registrationData: Profile): RegistrationPayload => ({
    ...registrationData,
    dateOfBirth: convertToContractDate(registrationData.dateOfBirth),
});

export const convertToRegistrationInternal = (registrationData: RegistrationResponse): Profile => ({
    firstName: registrationData.profile.firstName,
    lastName: registrationData.profile.lastName,
    gender: registrationData.profile.gender,
    dateOfBirth: convertToDateInternal(registrationData.profile.dateOfBirth),
    nationality: registrationData.profile.nationality,
    phone: registrationData.profile.phoneNumber,
    email: registrationData.profile.emailAddress,
    role: registrationData.profile.role,
    programIds: registrationData.profile.studyProgramIds.map((programId) => programId.toString()),
});

export const convertToRegistrationStatusInternal = (
    registrationData: RegistrationResponse
): RegistrationStatus => registrationData.status;
