import { Button, Stack } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    AutocompleteElement,
    DatePickerElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
    useForm,
} from "react-hook-form-mui";
import countryList from "react-select-country-list";
import { Gender, UserRole } from "../../utils/converter/contract-types/enums";
import { SelectOption } from "../../utils/common/commonTypes";
import { transformEnumIntoOptions } from "../../utils/common/commonUtils";
import { Profile } from "../../utils/converter/internal-types/internalTypes";
import { convertToRegistrationPayload } from "../../utils/converter/registrationConverter";
import DateFnsProvider from "./DateFnsProvider";
import { useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import { StudyprogramResponse } from "../../contracts/imports/ethereum-abi-types/StudyProgramView";
import useErrorStore from "../../hooks/error/errorHooks";
import RegistrationService from "../../services/RegistrationService";
import LoadingBox from "../LoadingBox";
import { alertError } from "../../utils/contract/contractUtils";
import { convertToStudyProgramSelectOption } from "../../utils/converter/optionConverter";

export interface RegistrationFormProps {
    updatePending: () => void;
}

const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({
    updatePending,
}: RegistrationFormProps) => {
    const { setErrorMessage } = useErrorStore();
    const studyProgramViewContract = useStudyProgramViewContract();
    const formContext = useForm<Profile>({});

    const [studyProgramOptions, setStudyProgramOptions] = useState<SelectOption[]>([]);
    const [processing, setProcessing] = useState<boolean>(false);

    const registrator = useMemo(() => {
        return new RegistrationService();
    }, []);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                setStudyProgramOptions(
                    (await alertError(() => studyProgramViewContract.getAllPrograms(), setErrorMessage)).map(
                        (studyProgram: StudyprogramResponse) =>
                            convertToStudyProgramSelectOption(convertToStudyProgramInternal(studyProgram))
                    )
                );
            }
        })();
    }, [studyProgramViewContract]);

    const countryOptions: SelectOption[] = useMemo(
        () =>
            countryList()
                .getData()
                .map((countryData) => ({ id: countryData.value, label: countryData.label })),
        []
    );

    const handleRegister = useCallback(
        (data: Profile) => {
            setProcessing(true);
            registrator
                .register(convertToRegistrationPayload(data))
                .then((response) => {
                    updatePending();
                })
                .catch((error) => {
                    setErrorMessage(error);
                })
                .finally(() => setProcessing(false));
        },
        [registrator]
    );

    return (
        <DateFnsProvider>
            <FormContainer formContext={formContext} onSuccess={(data) => handleRegister(data)}>
                <Stack spacing={2}>
                    <TextFieldElement name="firstName" label="First name" fullWidth required />
                    <TextFieldElement name="lastName" label="Last name" fullWidth required />
                    <SelectElement
                        name={"gender"}
                        label={"Gender"}
                        options={transformEnumIntoOptions(Gender)}
                        fullWidth
                        required
                    />
                    <DatePickerElement label="Date of birth" name="dateOfBirth" required />
                    <AutocompleteElement
                        label="Nationality"
                        name="nationality"
                        options={countryOptions}
                        required
                    />
                    <TextFieldElement name="phone" label="Phone number" type={"tel"} fullWidth required />
                    <TextFieldElement name="email" label="Email" type="email" fullWidth required />
                    <SelectElement
                        name={"role"}
                        label={"Role"}
                        options={transformEnumIntoOptions(UserRole)}
                        fullWidth
                        required
                    />
                    <AutocompleteElement
                        label="Study programs"
                        multiple
                        name="studyPrograms"
                        options={studyProgramOptions}
                        required
                    />
                    <Button
                        type={"submit"}
                        color={"secondary"}
                        variant="contained"
                        sx={{ mt: 2, py: 1, px: 4, fontWeight: 600, alignSelf: "start" }}
                        disabled={processing}
                    >
                        {processing ? <LoadingBox /> : "Upload"}
                    </Button>
                </Stack>
            </FormContainer>
        </DateFnsProvider>
    );
};

export default RegistrationForm;
