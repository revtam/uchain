import React, { useEffect, useState } from "react";
import { useCourseViewContract, useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { convertToCourseInternal } from "../../utils/converter/courseConverter";
import useErrorStore from "../../hooks/error/errorHooks";
import { alertError } from "../../utils/contract/contractUtils";
import PageTemplate from "../../components/data-display/PageTemplate";
import { CoursesGroupedBySemester } from "../../utils/common/commonTypes";
import SemesterAccordion from "../../components/data-display/accordions/SemesterAccordion";
import { getCoursesGroupedBySemester } from "../../utils/data/dataUtils";
import SemesterCourses from "../../components/data-display/data/nested-components/top-level/SemesterCourses";
import { supplyStaticProps } from "../../utils/common/commonUtils";
import { CourseProp } from "../../components/data-display/data/props";
import MyAssessmentsPerformances, {
    MyAssessmentsPerformancesStaticProps,
} from "../../components/data-display/data/nested-components/top-level/MyAssessmentsPerformances";
import { StudyProgram } from "../../types/internal-types/internalTypes";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";

const StudentPerformancesSubpage: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [coursesGroupedBySemester, setCoursesGroupedBySemester] = useState<
        CoursesGroupedBySemester[] | undefined
    >(undefined);
    const [enrolledStudyPrograms, setEnrolledStudyPrograms] = useState<StudyProgram[] | undefined>(undefined);

    useEffect(() => {
        if (!courseViewContract) return;
        (async () => {
            const courses = (
                await alertError(() => courseViewContract.getRegisteredCourses(), setErrorMessage)
            ).map((course) => convertToCourseInternal(course));
            setCoursesGroupedBySemester(getCoursesGroupedBySemester(courses));
        })();
    }, [courseViewContract]);

    useEffect(() => {
        if (!studyProgramViewContract) return;
        (async () => {
            setEnrolledStudyPrograms(
                (await studyProgramViewContract.getEnrolledPrograms()).map((studyProgram) =>
                    convertToStudyProgramInternal(studyProgram)
                )
            );
        })();
    }, [studyProgramViewContract]);

    if (!coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Your study performances">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCourses
                            courses={semesterCoursesGroup.courses}
                            relevantStudyPrograms={enrolledStudyPrograms}
                            courseAccordionContentComponent={supplyStaticProps<
                                CourseProp,
                                MyAssessmentsPerformancesStaticProps
                            >(MyAssessmentsPerformances, { enableUpload: true })}
                        />
                    </SemesterAccordion>
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default StudentPerformancesSubpage;
