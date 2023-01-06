import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import RegistrationForm from "../components/forms/RegistrationForm";
import { Gender, RegistrationStatus, UserRole } from "../contracts/enums";
import { useUserControllerContract, useUserViewContract } from "../hooks/contract/hooks";
import useErrorStore from "../hooks/error/hooks";
import { createTitleValueRow, getNormalizedEnumKey } from "../utils/common/utils";
import { alertError, handleTransactionCall, rerenderOnReturn } from "../utils/contract/utils";
import { Registration } from "../utils/converter/internalTypes";
import {
    convertToRegistrationInternal,
    convertToRegistrationStatusInternal,
} from "../utils/converter/registrationConverter";

export interface RegistrationPageProps {
    rerenderOnAcknowledge: () => void;
}

const RegistrationPage: React.FunctionComponent<RegistrationPageProps> = ({
    rerenderOnAcknowledge,
}: RegistrationPageProps) => {
    const { setErrorMessage } = useErrorStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();

    const [registrationPending, setRegistrationPending] = useState<boolean>(false);
    const [registration, setRegistration] = useState<Registration | undefined>(undefined);
    const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                setRegistrationPending(
                    await alertError(() => userViewContract.isUserRegistrationPending(), setErrorMessage)
                );
            }
        })();
    }, [userViewContract]);

    useEffect(() => {
        (async () => {
            if (userViewContract && registrationPending) {
                const registrationResponse = await alertError(
                    () => userViewContract.getPendingRegistration(),
                    setErrorMessage
                );
                setRegistration(convertToRegistrationInternal(registrationResponse));
                setRegistrationStatus(convertToRegistrationStatusInternal(registrationResponse));
            }
        })();
    }, [userViewContract, registrationPending]);

    const createRegistrationTableRows = useCallback((registration: Registration) => {
        return [
            createTitleValueRow("First name:", registration.firstName),
            createTitleValueRow("Last name:", registration.lastName),
            createTitleValueRow("Gender:", getNormalizedEnumKey(registration.gender, Gender)),
            createTitleValueRow("Date of birth:", registration.dateOfBirth.toLocaleDateString()),
            createTitleValueRow("Nationality:", registration.nationality),
            createTitleValueRow("Phone number:", registration.phone),
            createTitleValueRow("Email:", registration.email),
            createTitleValueRow("Role:", getNormalizedEnumKey(registration.role, UserRole)),
        ];
    }, []);

    if (registrationPending)
        return (
            <React.Fragment>
                <Table sx={{ width: "auto" }}>
                    <TableBody>
                        {registration &&
                            createRegistrationTableRows(registration).map((row) => (
                                <TableRow key={row.title} sx={{ border: 0 }}>
                                    <TableCell padding={"none"} sx={{ minWidth: 200, borderBottom: "none" }}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>{row.value}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {registrationStatus !== undefined && (
                    <Box marginTop={5}>
                        Status:
                        <Typography display={"inline"} marginLeft={2} fontWeight={600}>
                            {getNormalizedEnumKey(registrationStatus, RegistrationStatus).toUpperCase()}
                        </Typography>
                    </Box>
                )}
                <Button
                    type={"submit"}
                    color={"primary"}
                    variant="contained"
                    sx={{ mt: 3, py: 1, px: 4, fontWeight: 600 }}
                    onClick={async () =>
                        await alertError(
                            () =>
                                rerenderOnReturn(
                                    () =>
                                        handleTransactionCall(() =>
                                            userControllerContract.acknowledgeRegistrationResult()
                                        ),
                                    rerenderOnAcknowledge
                                ),
                            setErrorMessage
                        )
                    }
                >
                    Accept
                </Button>
                <Typography marginTop={2}>
                    You have to confirm that you acknowledged the result of your registration request. If it
                    was rejected, you may reapply.
                </Typography>
            </React.Fragment>
        );

    return <RegistrationForm />;
};

export default RegistrationPage;
