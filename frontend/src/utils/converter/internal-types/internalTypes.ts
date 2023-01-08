export type Profile = {
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

export type Name = {
    firstName: string;
    lastName: string;
};

export type StudyProgram = {
    id: string;
    title: string;
};
