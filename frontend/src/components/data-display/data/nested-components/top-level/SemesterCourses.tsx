import React, { useEffect, useState } from "react";
import { useStudyProgramViewContract } from "../../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../../LoadingBox";
import { alertError } from "../../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { CoursesGroupedByStudyProgram, StudyProgramsByCourse } from "../../../../../utils/common/commonTypes";
import { convertToStudyProgramInternal } from "../../../../../utils/converter/studyProgramConverter";
import StudyProgramCoursesAccordion from "../../../accordions/StudyProgramCoursesAccordion";
import { getCoursesGroupedByStudyProgram } from "../../../../../utils/data/dataUtils";
import StudyProgramCourses, { StudyProgramCoursesProps } from "../mid-level/StudyProgramCourses";
import { CourseListProp } from "../../props";
import { StudyProgram } from "../../../../../types/internal-types/internalTypes";

export type SemesterCoursesProps = {
    relevantStudyPrograms?: StudyProgram[];
};

const SemesterCourses: React.FunctionComponent<
    CourseListProp & SemesterCoursesProps & StudyProgramCoursesProps
> = ({
    courses,
    courseAccordionContentComponent,
    courseRegAndDeregEnabled,
    relevantStudyPrograms,
}: CourseListProp & SemesterCoursesProps & StudyProgramCoursesProps) => {
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
                        )
                            .map((studyProgram) => convertToStudyProgramInternal(studyProgram))
                            .filter((studyProgram) =>
                                relevantStudyPrograms
                                    ? relevantStudyPrograms.some(
                                          (relevantProgram) => relevantProgram.id === studyProgram.id
                                      )
                                    : true
                            ),
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
                    <StudyProgramCourses
                        courses={coursesGroup.courses}
                        courseRegAndDeregEnabled={courseRegAndDeregEnabled}
                        courseAccordionContentComponent={courseAccordionContentComponent}
                    />
                </StudyProgramCoursesAccordion>
            ))}
        </React.Fragment>
    );
};
export default SemesterCourses;
