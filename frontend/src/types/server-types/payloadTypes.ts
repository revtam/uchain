import { Date } from "../contract-types/structs";

export type RegistrationPayload = {
    address: string;
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: Date;
    nationality: string;
    phone: string;
    email: string;
    role: number;
    programIds: string[];
};

export type UploadSuccessResponse = {
    hashes: string[];
};

export type UploadErrorResponse = {
    message: string;
};
