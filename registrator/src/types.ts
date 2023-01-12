export type ErrorResponse = {
    message: string;
};

export type AddressType = {
    userController: string;
};

export type Profile = {
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: { year: number; month: number; day: number };
    nationality: string;
    phone: string;
    email: string;
    role: number;
    programIds: string[];
};

export type RegistrationPayload = Profile & {
    address: string;
};
