import React, { useEffect, useState } from "react";
import { Course } from "../../../../utils/converter/internal-types/internalTypes";
import { useStudyProgramViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { CoursesGroupedByStudyProgram, StudyProgramsByCourse } from "../../../../utils/common/commonTypes";
import { convertToStudyProgramInternal } from "../../../../utils/converter/studyProgramConverter";
import StudyProgramCoursesAccordion from "../../accordions/StudyProgramCoursesAccordion";
import StudyProgramCoursesData, { StudyProgramCoursesDataConfigProps } from "./StudyProgramCoursesData";
import { getCoursesGroupedByStudyProgram } from "../../../../utils/data/dataUtils";

export interface SemesterCoursesDataProps extends StudyProgramCoursesDataConfigProps {
    courses: Course[];
}

const SemesterCoursesData: React.FunctionComponent<SemesterCoursesDataProps> = ({
    courses,
    mainContentFunction,
    deregisterEnabled,
    registerEnabled,
}: SemesterCoursesDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [coursesGroupedByStudyPrograms, setCoursesGroupedByStudyPrograms] = useState<
        CoursesGroupedByStudyProgram[] | undefined
    >(undefined);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                const studyProgramsByCourses: StudyProgramsByCourse[] = await Promise.all(
                    courses.map(async (course) => ({
                        course: course,
                        studyPrograms: (
                            await alertError(
                                () => studyProgramViewContract.getStudyProgramsToCourseId(course.id),
                                setErrorMessage
                            )
                        ).map((studyProgram) => convertToStudyProgramInternal(studyProgram)),
                    }))
                );
                setCoursesGroupedByStudyPrograms(getCoursesGroupedByStudyProgram(studyProgramsByCourses));
            }
        })();
    }, [courses, studyProgramViewContract]);

    if (!coursesGroupedByStudyPrograms) return <LoadingBox />;

    return (
        <React.Fragment>
            {coursesGroupedByStudyPrograms.map((coursesGroup, index) => (
                <StudyProgramCoursesAccordion studyProgram={coursesGroup.studyProgram} key={index}>
                    <StudyProgramCoursesData
                        courses={coursesGroup.courses}
                        deregisterEnabled={deregisterEnabled}
                        registerEnabled={registerEnabled}
                        mainContentFunction={mainContentFunction}
                    />
                </StudyProgramCoursesAccordion>
            ))}
        </React.Fragment>
    );
};
export default SemesterCoursesData;
