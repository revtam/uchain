import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Control, Controller } from "react-hook-form-mui";
import { TextField } from "@mui/material";

export type CustomDatePickerProps = {
    control: Control<any, any>;
    name: string;
    label: string;
    required?: boolean;
};

const CustomDatePicker: React.FunctionComponent<CustomDatePickerProps> = ({
    control,
    name,
    label,
    required = false,
}: CustomDatePickerProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required ? true : undefined }}
            render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
                <DatePicker
                    label={label}
                    onChange={(date) => onChange(date)}
                    value={value || ""}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            required={required}
                            error={invalid}
                            helperText={error && "This field is required"}
                        />
                    )}
                />
            )}
        />
    );
};

export default CustomDatePicker;
