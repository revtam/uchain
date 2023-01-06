import { Date } from "../../contracts/structs";

export type RegistrationPayload = {
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: Date;
    nationality: string;
    phone: string;
    email: string;
    role: number;
};
