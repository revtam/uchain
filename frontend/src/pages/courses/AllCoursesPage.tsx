import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../hooks/contract/contractHooks";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { convertToCourseInternal } from "../../utils/converter/courseConverter";
import { LOG_IN } from "../../constants/authMessages";
import useErrorStore from "../../hooks/error/errorHooks";
import { alertError } from "../../utils/contract/contractUtils";
import PageTemplate from "../../components/data-display/PageTemplate";
import { CoursesGroupedBySemester } from "../../utils/common/commonTypes";
import SemesterAccordion from "../../components/data-display/accordions/SemesterAccordion";
import SemesterCourses from "../../components/data-display/data/nested-components/top-level/SemesterCourses";
import { getCoursesGroupedBySemester } from "../../utils/data/dataUtils";
import CourseInfo from "../../components/data-display/data/nested-components/top-level/CourseInfo";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../types/contract-types/enums";

const AllCoursesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { userRole } = useAuthStore();

    const courseViewContract = useCourseViewContract();

    const [coursesGroupedBySemester, setCoursesGroupedBySemester] = useState<
        CoursesGroupedBySemester[] | undefined
    >(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                const courses = (
                    await alertError(() => courseViewContract.getAllCourses(), setErrorMessage)
                ).map((course) => convertToCourseInternal(course));
                setCoursesGroupedBySemester(getCoursesGroupedBySemester(courses));
            }
        })();
    }, [courseViewContract]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (!coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="All courses">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCourses
                            courses={semesterCoursesGroup.courses}
                            courseRegAndDeregEnabled={userRole === UserRole.STUDENT}
                            courseAccordionContentComponent={CourseInfo}
                        />
                    </SemesterAccordion>
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default AllCoursesPage;
