export interface ErrorState {
    errorMessage: string | undefined;
    rerender: {};
    setErrorMessage: ErrorMessageSetter;
}

export type ErrorMessageSetter = (errorMessage: string | undefined) => void;
