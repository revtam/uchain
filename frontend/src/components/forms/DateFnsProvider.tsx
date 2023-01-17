import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers";

/**
 * Source: https://github.com/dohomi/react-hook-form-mui/blob/HEAD/packages/rhf-mui/src/DateFnsProvider.tsx
 */
export type DateFnsProviderProps = Omit<LocalizationProviderProps, "dateAdapter"> & {
    dateAdapter?: LocalizationProviderProps["dateAdapter"];
};

const DateFnsProvider: React.FunctionComponent<DateFnsProviderProps> = ({
    children,
    ...props
}: DateFnsProviderProps) => {
    const { dateAdapter, ...localizationProps } = props;
    return (
        <LocalizationProvider dateAdapter={dateAdapter || AdapterDateFns} {...localizationProps}>
            {children}
        </LocalizationProvider>
    );
};

export default DateFnsProvider;
