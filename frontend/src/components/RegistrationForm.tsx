import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    AutocompleteElement,
    CheckboxButtonGroup,
    CheckboxElement,
    DatePickerElement,
    FormContainer,
    MultiSelectElement,
    PasswordElement,
    PasswordRepeatElement,
    RadioButtonGroup,
    SelectElement,
    SwitchElement,
    TextFieldElement,
    useForm,
} from "react-hook-form-mui";
import DateFnsProvider from "./forms/DateFnsProvider";

const RegistrationForm: React.FunctionComponent<any> = () => {
    // return (
    //     <FormContainer defaultValues={{ name: "" }} onSuccess={(data) => console.log(data)}>
    //         <TextFieldElement name="firstName" label="First name" required />
    //         <TextFieldElement name="lastName" label="Last name" required />
    //     </FormContainer>
    // );

    const formContext = useForm<{
        multi_select: string[];
        name: string;
        auto: string;
        auto_multi: string[];
        select: string;
        switch: boolean;
        checkbox: string[];
        check: boolean;
        date: string;
        radio: string;
        password: string;
        password_repeat: string;
    }>({});

    const options = [
        { id: "one", label: "One" },
        { id: "two", label: "Two" },
        { id: "three", label: "Three" },
    ];

    return (
        <DateFnsProvider>
            <FormContainer formContext={formContext} onSuccess={(data) => console.log(data)}>
                <TextFieldElement name={"name"} label={"Name"} fullWidth />
                <br />
                <br />
                <AutocompleteElement name={"auto"} label={"Autocomplete"} options={options} />
                <br />
                <AutocompleteElement
                    name={"auto_multi"}
                    label={"Autocomplete Multiple"}
                    multiple
                    options={options}
                />
                <br />
                <SelectElement name={"select"} label={"Select"} options={options} fullWidth />
                <br />
                <br />
                <MultiSelectElement
                    showCheckbox
                    name={"multi_select"}
                    label={"Multi Select"}
                    options={options}
                    fullWidth
                />
                <br />
                <br />
                <DatePickerElement name={"date"} /> <br />
                <RadioButtonGroup name={"radio"} label={"Radio"} options={options} />
                <br />
                <CheckboxButtonGroup name={"checkbox"} label={"Radio"} options={options} />
                <br />
                <PasswordElement name={"password"} label={"Password"} />
                <br />
                <br />
                <PasswordRepeatElement
                    name={"password_repeat"}
                    label={"Password Repeat"}
                    passwordFieldName={"password"}
                />
                <br />
                <SwitchElement name={"switch"} label={"Switch"} />
                <br />
                <CheckboxElement name={"check"} label={"Check"} />
                <br />
                <Button type={"submit"} color={"primary"}>
                    Submit
                </Button>
            </FormContainer>{" "}
        </DateFnsProvider>
    );
};

export default RegistrationForm;
