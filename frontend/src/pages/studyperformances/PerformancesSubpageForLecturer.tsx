import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../hooks/contract/contractHooks";
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
import CourseParticipantsAssessmentsPerformances, {
    CourseParticipantsAssessmentsPerformancesStaticProps,
} from "../../components/data-display/data/nested-components/top-level/CourseParticipantsAssessmentsPerformances";
import { CourseProp } from "../../components/data-display/data/props";

const StudentPerformancesSubpage: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();

    const [coursesGroupedBySemester, setCoursesGroupedBySemester] = useState<
        CoursesGroupedBySemester[] | undefined
    >(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                const courses = (
                    await alertError(() => courseViewContract.getCoursesLecturingAt(), setErrorMessage)
                ).map((course) => convertToCourseInternal(course));
                setCoursesGroupedBySemester(getCoursesGroupedBySemester(courses));
            }
        })();
    }, [courseViewContract]);

    if (!coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Student performances">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCourses
                            courses={semesterCoursesGroup.courses}
                            courseAccordionContentComponent={supplyStaticProps<
                                CourseProp,
                                CourseParticipantsAssessmentsPerformancesStaticProps
                            >(CourseParticipantsAssessmentsPerformances, {
                                disableAssessmentInfo: true,
                                enableAttendanceEdit: true,
                                enableEvaluationEdit: true,
                            })}
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
