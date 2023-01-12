import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_LECTURER } from "../../constants/authMessages";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import PageTemplate from "../../components/data-display/PageTemplate";
import { useCourseViewContract } from "../../hooks/contract/contractHooks";
import { alertError } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { convertToCourseInternal } from "../../utils/converter/courseConverter";
import { CoursesGroupedBySemester } from "../../utils/common/commonTypes";
import { getCoursesGroupedBySemester } from "../../utils/data/dataUtils";
import SemesterAccordion from "../../components/data-display/accordions/SemesterAccordion";
import SemesterCourses from "../../components/data-display/data/nested-components/top-level/SemesterCourses";
import { bindProps } from "../../utils/common/commonUtils";
import CourseParticipantsCoursePerformances, {
    CourseParticipantsCoursePerformancesStaticProps,
} from "../../components/data-display/data/nested-components/top-level/CourseParticipantsCoursePerformances";
import { CourseProp } from "../../components/data-display/data/props";

const GradingPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();
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

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.LECTURER)
        return <CenterContent>{NOT_LECTURER}</CenterContent>;

    if (userRole === undefined || !coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle={"Grading"}>
            {/* <Stack spacing={2}> */}
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCourses
                            courses={semesterCoursesGroup.courses}
                            courseAccordionContentComponent={bindProps<
                                CourseProp,
                                CourseParticipantsCoursePerformancesStaticProps
                            >(CourseParticipantsCoursePerformances, { gradingEnabled: true })}
                        />
                    </SemesterAccordion>
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
            {/* </Stack> */}
        </PageTemplate>
    );
};

export default GradingPage;
