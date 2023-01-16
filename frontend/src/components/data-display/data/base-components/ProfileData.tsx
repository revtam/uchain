import React, { useEffect, useState } from "react";
import { Profile, StudyProgram } from "../../../../utils/converter/internal-types/internalTypes";
import { getDefaultDataPlaceholderOrData, getNormalizedEnumKey } from "../../../../utils/common/commonUtils";
import { Gender, UserRole } from "../../../../utils/converter/contract-types/enums";
import { useStudyProgramViewContract } from "../../../../hooks/contract/contractHooks";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { convertToStudyProgramInternal } from "../../../../utils/converter/studyProgramConverter";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";

export interface ProfileDataProps {
    profile: Profile;
}

const ProfileData: React.FunctionComponent<ProfileDataProps> = ({ profile }: ProfileDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                const _studyPrograms: StudyProgram[] = [];
                for (const programId of profile.programIds) {
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
    }, [studyProgramViewContract, profile]);

    return (
        <DataTable>
            <TitledTableRow title={"First name:"}>{profile.firstName}</TitledTableRow>
            <TitledTableRow title={"Last name:"}>{profile.lastName}</TitledTableRow>
            <TitledTableRow title={"Gender:"}>{getNormalizedEnumKey(profile.gender, Gender)}</TitledTableRow>
            <TitledTableRow title={"Date of birth:"}>
                {profile.dateOfBirth.toLocaleDateString()}
            </TitledTableRow>
            <TitledTableRow title={"Nationality:"}>{profile.nationality}</TitledTableRow>
            <TitledTableRow title={"Phone number:"}>{profile.phone}</TitledTableRow>
            <TitledTableRow title={"Email:"}>{profile.email}</TitledTableRow>
            <TitledTableRow title={"Role:"}>{getNormalizedEnumKey(profile.role, UserRole)}</TitledTableRow>
            <TitledTableRow title={"Study programs:"}>
                {getDefaultDataPlaceholderOrData(
                    studyPrograms.map((studyProgram) => studyProgram.title).join(", ")
                )}
            </TitledTableRow>
        </DataTable>
    );
};
export default ProfileData;
