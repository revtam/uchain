import create from "zustand";
import { UserRole } from "../../types/contract-types/enums";
import { AuthState } from "./types";

const useAuthStore = create<AuthState>((set) => ({
    admin: undefined,
    registered: undefined,
    userRole: undefined,
    reauthorized: {},
    setAdmin: (admin: boolean | undefined) =>
        set((state: AuthState) => ({
            admin: admin,
        })),
    setRegistered: (registered: boolean | undefined) =>
        set((state: AuthState) => ({
            registered: registered,
        })),
    setUserRole: (userRole: UserRole | undefined) =>
        set((state: AuthState) => ({
            userRole: userRole,
        })),
    callReauthorize: () => set((state: AuthState) => ({ reauthorized: {} })),
}));

export default useAuthStore;
