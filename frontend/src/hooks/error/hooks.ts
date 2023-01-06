import create from "zustand";
import { ErrorState } from "./types";

const useErrorStore = create<ErrorState>((set) => ({
    errorMessage: undefined,
    rerender: {},
    setErrorMessage: (errorMessage: string | undefined) =>
        set((state: ErrorState) => ({
            ...state,
            errorMessage: errorMessage,
            rerender: {},
        })),
}));

export default useErrorStore;
