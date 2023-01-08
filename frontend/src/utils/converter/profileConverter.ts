import { UserprofileResponse } from "../../contracts/imports/ethereum-abi-types/UserView";
import { Name, Profile } from "./internal-types/internalTypes";

export const convertToNameInternal = (profile: UserprofileResponse): Name => {
    return { firstName: profile.firstName, lastName: profile.lastName };
};

export const convertToProfileInternal = (profile: UserprofileResponse): Profile => {
    const date = new Date();
    date.setDate(Number(profile.dateOfBirth.day));
    date.setMonth(Number(profile.dateOfBirth.month) - 1);
    date.setFullYear(Number(profile.dateOfBirth.year));
    return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        dateOfBirth: date,
        nationality: profile.nationality,
        phone: profile.phoneNumber,
        email: profile.emailAddress,
        role: profile.role,
        programIds: profile.studyProgramIds.map((programId) => programId.toString()),
    };
};
