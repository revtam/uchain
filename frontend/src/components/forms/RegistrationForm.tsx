import { Box, Stack } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    AutocompleteElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
    useForm,
} from "react-hook-form-mui";
import countryList from "react-select-country-list";
import { Gender, UserRole } from "../../types/contract-types/enums";
import { SelectOption } from "../../utils/common/commonTypes";
import { RegistrationFormType } from "../../types/internal-types/internalTypes";
import { convertToRegistrationPayload } from "../../utils/converter/registrationConverter";
import DateFnsProvider from "./DateFnsProvider";
import { useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import { StudyprogramResponse } from "../../imports/ethereum-abi-types/StudyProgramView";
import useErrorStore from "../../hooks/error/errorHooks";
import RegistrationService from "../../services/RegistrationService";
import { alertError } from "../../utils/contract/contractUtils";
import {
    convertToStudyProgramSelectOption,
    transformEnumIntoOptions,
} from "../../utils/converter/optionConverter";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import SubmitButton from "../data-display/action-button/SubmitButton";
import CustomDatePicker from "./CustomDatePicker";

export interface RegistrationFormProps {
    updatePending: () => void;
}

const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({
    updatePending,
}: RegistrationFormProps) => {
    const { setErrorMessage } = useErrorStore();
    const { account } = useWeb3React<Web3Provider>();
    const studyProgramViewContract = useStudyProgramViewContract();
    const formContext = useForm<RegistrationFormType>({ defaultValues: { programIds: [] } });
    const watchedUserRole = formContext.watch("role");

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
        (data: RegistrationFormType) => {
            if (!account) return;
            setProcessing(true);
            try {
                registrator
                    .register(convertToRegistrationPayload(data, account))
                    .then((_) => {
                        updatePending();
                    })
                    .catch((error) => {
                        setErrorMessage(error.response?.data?.message || error.message);
                    })
                    .finally(() => setProcessing(false));
            } catch (error) {
                console.log(error);
                setProcessing(false);
            }
        },
        [registrator, account]
    );

    return (
        <DateFnsProvider>
            <FormContainer formContext={formContext} onSuccess={(data) => handleRegister(data)}>
                <Stack spacing={2}>
                    <TextFieldElement
                        name={formContext.register("firstName").name}
                        label="First name"
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("lastName").name}
                        label="Last name"
                        required
                    />
                    <SelectElement
                        name={formContext.register("gender").name}
                        label={"Gender"}
                        options={transformEnumIntoOptions(Gender)}
                        required
                    />
                    <CustomDatePicker
                        control={formContext.control}
                        name={formContext.register("dateOfBirth").name}
                        label={"Date of birth"}
                        required
                    />
                    <AutocompleteElement
                        label="Nationality"
                        name={formContext.register("nationality").name}
                        options={countryOptions}
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("phone").name}
                        label="Phone number"
                        type={"tel"}
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("email").name}
                        label="Email"
                        type="email"
                        required
                    />
                    <SelectElement
                        name={formContext.register("role").name}
                        label={"Role"}
                        options={transformEnumIntoOptions(UserRole)}
                        required
                    />
                    {watchedUserRole == UserRole.STUDENT && (
                        <AutocompleteElement
                            label="Study programs"
                            multiple
                            name={formContext.register("programIds").name}
                            options={studyProgramOptions}
                        />
                    )}
                    <Box marginTop={2}>
                        <SubmitButton text={"Request"} disabled={processing} />
                    </Box>
                </Stack>
            </FormContainer>
        </DateFnsProvider>
    );
};

export default RegistrationForm;
