import { Button } from "@mui/material";
import React, { useMemo } from "react";
import {
    DatePickerElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
    useForm,
} from "react-hook-form-mui";
import countryList from "react-select-country-list";

import { Gender, UserRole } from "../../contracts/enums";
import { SelectOption } from "../../utils/common/types";
import { transformEnumIntoOptions } from "../../utils/common/utils";
import { Registration } from "../../utils/converter/internalTypes";
import { convertToRegistrationPayload } from "../../utils/converter/registrationConverter";
import DateFnsProvider from "./DateFnsProvider";

const RegistrationForm: React.FunctionComponent<any> = () => {
    const formContext = useForm<Registration>({});

    const countryOptions: SelectOption[] = useMemo(
        () =>
            countryList()
                .getData()
                .map((countryData) => ({ id: countryData.value, label: countryData.label })),
        []
    );

    return (
        <DateFnsProvider>
            <FormContainer
                formContext={formContext}
                onSuccess={(data) => console.log(convertToRegistrationPayload(data))}
            >
                <TextFieldElement
                    name="firstName"
                    label="First name"
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                <TextFieldElement
                    name="lastName"
                    label="Last name"
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                <SelectElement
                    name={"gender"}
                    label={"Gender"}
                    options={transformEnumIntoOptions(Gender)}
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                <DatePickerElement
                    label="Date of birth"
                    name="dateOfBirth"
                    className="formFieldMargin"
                    required
                />
                <SelectElement
                    name={"nationality"}
                    label={"Nationality"}
                    options={countryOptions}
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                <TextFieldElement
                    name="phone"
                    label="Phone number"
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                <TextFieldElement name="email" label="Email" className="formFieldMargin" fullWidth required />
                <SelectElement
                    name={"role"}
                    label={"Role"}
                    options={transformEnumIntoOptions(UserRole)}
                    className="formFieldMargin"
                    fullWidth
                    required
                />
                {/* <div className="formFieldMargin">
                    <AutocompleteElement name={"auto"} label={"Autocomplete"} options={options} />
                </div> */}

                <Button
                    type={"submit"}
                    color={"secondary"}
                    variant="contained"
                    sx={{ mt: 2, py: 1, px: 4, fontWeight: 600 }}
                >
                    Request
                </Button>
            </FormContainer>{" "}
        </DateFnsProvider>
    );
};

export default RegistrationForm;
