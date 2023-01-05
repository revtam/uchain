import create from "zustand";
import { ErrorState } from "./types";

const useErrorStore = create<ErrorState>((set) => ({
    errorMessage: undefined,
    setErrorMessage: (errorMessage: string | undefined) =>
        set((state: ErrorState) => ({
            ...state,
            errorMessage,
        })),
}));

export default useErrorStore;
