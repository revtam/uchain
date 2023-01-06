import { RegistrationStatus } from "../../contracts/enums";
import { RegistrationResponse } from "../../contracts/imports/ethereum-abi-types/UserView";
import { Registration } from "./internalTypes";
import { RegistrationPayload } from "./payloadTypes";

/* Server payload */
export const convertToRegistrationPayload = (registrationData: Registration): RegistrationPayload => {
    return {
        ...registrationData,
        dateOfBirth: {
            year: registrationData.dateOfBirth.getFullYear(),
            month: registrationData.dateOfBirth.getMonth() + 1,
            day: registrationData.dateOfBirth.getDate(),
        },
    };
};

export const convertToRegistrationInternal = (registrationData: RegistrationResponse): Registration => {
    const date = new Date();
    date.setDate(Number(registrationData.profile.dateOfBirth.day));
    date.setMonth(Number(registrationData.profile.dateOfBirth.month) - 1);
    date.setFullYear(Number(registrationData.profile.dateOfBirth.year));
    return {
        firstName: registrationData.profile.firstName,
        lastName: registrationData.profile.lastName,
        gender: registrationData.profile.gender,
        dateOfBirth: date,
        nationality: registrationData.profile.nationality,
        phone: registrationData.profile.phoneNumber,
        email: registrationData.profile.emailAddress,
        role: registrationData.profile.role,
    };
};

export const convertToRegistrationStatusInternal = (
    registrationData: RegistrationResponse
): RegistrationStatus => {
    return registrationData.status;
};
