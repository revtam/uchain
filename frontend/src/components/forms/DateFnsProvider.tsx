import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers";

export type DateFnsProviderProps = Omit<LocalizationProviderProps, "dateAdapter"> & {
    dateAdapter?: LocalizationProviderProps["dateAdapter"];
};
const DateFnsProvider: React.FunctionComponent<DateFnsProviderProps> = ({ children, ...props }) => {
    const { dateAdapter, ...localizationProps } = props;
    return (
        <LocalizationProvider dateAdapter={dateAdapter || AdapterDateFns} {...localizationProps}>
            {children}
        </LocalizationProvider>
    );
};

export default DateFnsProvider;
