import { UserRole } from "../../types/contract-types/enums";

export interface AuthState {
    admin: boolean | undefined;
    registered: boolean | undefined;
    userRole: UserRole | undefined;
    reauthorized: Record<string, never>;
    setAdmin: AdminSetter;
    setRegistered: RegisteredSetter;
    setUserRole: UserRoleSetter;
    callReauthorize: ReAuthorizeCaller;
}

export type AdminSetter = (admin: boolean | undefined) => void;
export type RegisteredSetter = (registered: boolean | undefined) => void;
export type UserRoleSetter = (userRole: UserRole | undefined) => void;
export type ReAuthorizeCaller = () => void;
