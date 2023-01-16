import { RegistrationPayload } from "./types";
import { RequestRegistrationRequest } from "./imports/UserController";

export const convertToRegistrationExternal = (
    registration: RegistrationPayload
): RequestRegistrationRequest => ({
    firstName: registration.firstName,
    lastName: registration.lastName,
    gender: registration.gender,
    dateOfBirth: registration.dateOfBirth,
    nationality: registration.nationality,
    phoneNumber: registration.phone,
    emailAddress: registration.email,
    role: registration.role,
    studyProgramIds: registration.programIds,
});
