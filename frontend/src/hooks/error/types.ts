export interface ErrorState {
    errorMessage: string | undefined;
    setErrorMessage: (errorMessage: string | undefined) => void;
}
