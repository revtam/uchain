export interface ErrorState {
    errorMessage: string | undefined;
    rerender: Record<string, never>;
    setErrorMessage: ErrorMessageSetter;
}

export type ErrorMessageSetter = (errorMessage: string | undefined) => void;
