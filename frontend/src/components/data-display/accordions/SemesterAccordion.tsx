import React, { useEffect, useState } from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { useStudyProgramViewContract } from "../../../hooks/contract/contractHooks";
import useErrorStore from "../../../hooks/error/errorHooks";
import { CoursesGroupedByStudyProgram } from "../../../utils/common/commonTypes";
import { getNormalizedEnumKey } from "../../../utils/common/commonUtils";
import { alertError } from "../../../utils/contract/contractUtils";
import { SemesterSeason } from "../../../utils/converter/contract-types/enums";
import { Course, Semester } from "../../../utils/converter/internal-types/internalTypes";
import { convertToStudyProgramInternal } from "../../../utils/converter/studyProgramConverter";
import LoadingBox from "../../LoadingBox";
import { CourseAccordionConfigProps } from "./CourseAccordion";
import CustomAccordion from "./CustomAccordion";
import StudyProgramCoursesAccordion from "./StudyProgramCoursesAccordion";

export interface SemesterAccordionProps extends CourseAccordionConfigProps {
    semester: Semester;
    courses: Course[];
}

const SemesterAccordion: React.FunctionComponent<SemesterAccordionProps> = ({
    courses,
    semester,
    showParticipants,
    registerEnabled,
    deregisterEnabled,
    assessmentRegAndDeregEnabled,
}: SemesterAccordionProps) => {
    const { setErrorMessage } = useErrorStore();
    const { loaded, signalLoad } = useLoadSignal();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [coursesGroupedByStudyPrograms, setCoursesGroupedByStudyPrograms] = useState<
        CoursesGroupedByStudyProgram[] | undefined
    >(undefined);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract && loaded) {
                const _coursesGroupedByStudyPrograms: CoursesGroupedByStudyProgram[] = [];
                for (const course of courses) {
                    const studyProgramsOfCourse = (
                        await alertError(
                            () => studyProgramViewContract.getStudyProgramsToCourseId(course.id),
                            setErrorMessage
                        )
                    ).map((studyProgram) => convertToStudyProgramInternal(studyProgram));
                    for (const nextStudyProgram of studyProgramsOfCourse) {
                        let studyProgramExists = false;
                        for (let i = 0; i < _coursesGroupedByStudyPrograms.length; ++i) {
                            if (_coursesGroupedByStudyPrograms[i].studyProgram.id === nextStudyProgram.id) {
                                studyProgramExists = true;
                                _coursesGroupedByStudyPrograms[i].courses.push(course);
                            }
                        }
                        if (!studyProgramExists)
                            _coursesGroupedByStudyPrograms.push({
                                studyProgram: nextStudyProgram,
                                courses: [course],
                            });
                    }
                }
                setCoursesGroupedByStudyPrograms(_coursesGroupedByStudyPrograms);
            }
        })();
    }, [courses, loaded, studyProgramViewContract]);

    return (
        <CustomAccordion
            title={`${semester.year}${getNormalizedEnumKey(semester.season, SemesterSeason).charAt(0)}S`}
            arrowColor="var(--mui-palette-primary-contrastText)"
            summaryBackgroundColor="var(--mui-palette-primary-main)"
            summaryTextColor="var(--mui-palette-primary-contrastText)"
            signalLoad={signalLoad}
        >
            {!loaded || !coursesGroupedByStudyPrograms ? (
                <LoadingBox />
            ) : (
                coursesGroupedByStudyPrograms.map((coursesGroup, index) => (
                    <StudyProgramCoursesAccordion
                        studyProgram={coursesGroup.studyProgram}
                        courses={coursesGroup.courses}
                        key={index}
                        registerEnabled={registerEnabled}
                        assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                        deregisterEnabled={deregisterEnabled}
                        showParticipants={showParticipants}
                    />
                ))
            )}
        </CustomAccordion>
    );
};

export default SemesterAccordion;
