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
import { Profile, RegistrationFormType } from "../../utils/converter/internal-types/internalTypes";
import { convertToRegistrationPayload } from "../../utils/converter/registrationConverter";
import DateFnsProvider from "./DateFnsProvider";
import { useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import { StudyprogramResponse } from "../../imports/ethereum-abi-types/StudyProgramView";
import useErrorStore from "../../hooks/error/errorHooks";
import RegistrationService from "../../services/RegistrationService";
import LoadingBox from "../LoadingBox";
import { alertError } from "../../utils/contract/contractUtils";
import {
    convertToStudyProgramSelectOption,
    transformEnumIntoOptions,
} from "../../utils/converter/optionConverter";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

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
                    });
            } catch (error) {
                console.log(error);
            }
            setProcessing(false);
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
                        fullWidth
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("lastName").name}
                        label="Last name"
                        fullWidth
                        required
                    />
                    <SelectElement
                        name={formContext.register("gender").name}
                        label={"Gender"}
                        options={transformEnumIntoOptions(Gender)}
                        fullWidth
                        required
                    />
                    <DatePickerElement
                        label="Date of birth"
                        name={formContext.register("dateOfBirth").name}
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
                        fullWidth
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("email").name}
                        label="Email"
                        type="email"
                        fullWidth
                        required
                    />
                    <SelectElement
                        name={formContext.register("role").name}
                        label={"Role"}
                        options={transformEnumIntoOptions(UserRole)}
                        fullWidth
                        required
                    />
                    <AutocompleteElement
                        label="Study programs"
                        multiple
                        name={formContext.register("programIds").name}
                        options={studyProgramOptions}
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
