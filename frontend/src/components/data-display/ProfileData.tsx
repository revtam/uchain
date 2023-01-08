import React, { useCallback, useEffect, useState } from "react";
import { Profile, StudyProgram } from "../../utils/converter/internal-types/internalTypes";
import { createTitleValueRow, getNormalizedEnumKey } from "../../utils/common/commonUtils";
import { Gender, UserRole } from "../../utils/converter/contract-types/enums";
import { useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import { alertError } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import DataTable from "./DataTable";

export interface ProfileDataProps {
    registration: Profile;
}

const ProfileData: React.FunctionComponent<ProfileDataProps> = ({ registration }: ProfileDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                const _studyPrograms: StudyProgram[] = [];
                for (const programId of registration.programIds) {
                    const studyProgram = convertToStudyProgramInternal(
                        await alertError(
                            () => studyProgramViewContract.getProgram(programId),
                            setErrorMessage
                        )
                    );
                    _studyPrograms.push(studyProgram);
                }
                setStudyPrograms(_studyPrograms);
            }
        })();
    }, [studyProgramViewContract, registration]);

    const createRegistrationTableRows = useCallback((registration: Profile) => {
        return [
            createTitleValueRow("First name:", registration.firstName),
            createTitleValueRow("Last name:", registration.lastName),
            createTitleValueRow("Gender:", getNormalizedEnumKey(registration.gender, Gender)),
            createTitleValueRow("Date of birth:", registration.dateOfBirth.toLocaleDateString()),
            createTitleValueRow("Nationality:", registration.nationality),
            createTitleValueRow("Phone number:", registration.phone),
            createTitleValueRow("Email:", registration.email),
            createTitleValueRow("Role:", getNormalizedEnumKey(registration.role, UserRole)),
            createTitleValueRow(
                "Study programs:",
                studyPrograms.map((studyProgram) => studyProgram.title).join(", ")
            ),
        ];
    }, []);

    return <DataTable rows={createRegistrationTableRows(registration)} />;
};
export default ProfileData;
