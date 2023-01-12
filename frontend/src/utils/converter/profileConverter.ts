import { UserprofileResponse } from "../../imports/ethereum-abi-types/UserView";
import { convertToDateInternal } from "./basicConverter";
import { Name, Profile } from "./internal-types/internalTypes";

export const convertToNameInternal = (profile: UserprofileResponse): Name => ({
    firstName: profile.firstName,
    lastName: profile.lastName,
});

export const convertToProfileInternal = (profile: UserprofileResponse): Profile => ({
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    dateOfBirth: convertToDateInternal(profile.dateOfBirth),
    nationality: profile.nationality,
    phone: profile.phoneNumber,
    email: profile.emailAddress,
    role: profile.role,
    programIds: profile.studyProgramIds.map((programId) => programId.toString()),
});
