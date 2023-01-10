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
import SemesterCoursesData from "../../components/data-display/data/courses-page/SemesterCoursesData";

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
                    await alertError(() => courseViewContract.getRegisteredCourses(), setErrorMessage)
                ).map((course) => convertToCourseInternal(course));
                setCoursesGroupedBySemester(getCoursesGroupedBySemester(courses));
            }
        })();
    }, [courseViewContract]);

    if (!coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Your study performances">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCoursesData courses={semesterCoursesGroup.courses} mainContentFunction={} />
                    </SemesterAccordion>
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default StudentPerformancesSubpage;
