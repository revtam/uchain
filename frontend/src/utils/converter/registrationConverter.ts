import { RegistrationStatus } from "../../types/contract-types/enums";
import { RegistrationResponse } from "../../imports/ethereum-abi-types/UserView";
import { Profile, RegistrationFormType } from "./internal-types/internalTypes";
import { RegistrationPayload } from "./server-types/payloadTypes";
import { convertToDateExternal, convertToDateInternal } from "./basicConverter";

/* Server payload */
export const convertToRegistrationPayload = (
    registrationForm: RegistrationFormType,
    address: string
): RegistrationPayload => ({
    ...registrationForm,
    dateOfBirth: convertToDateExternal(registrationForm.dateOfBirth),
    nationality: registrationForm.nationality.label.toString(),
    programIds: registrationForm.programIds.map((programId) => programId.id.toString()),
    address: address,
});

export const convertRegistrationToProfileInternal = (registrationData: RegistrationResponse): Profile => ({
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

export const convertToAddressInternal = (registrationData: RegistrationResponse): string =>
    registrationData.userAddress;
