import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../hooks/contract/contractHooks";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { convertToCourseInternal } from "../../utils/converter/courseConverter";
import { LOG_IN, NOT_LECTURER_OR_STUDENT, NOT_REGISTERED } from "../../constants/authMessages";
import useErrorStore from "../../hooks/error/errorHooks";
import { alertError } from "../../utils/contract/contractUtils";
import PageTemplate from "../../components/data-display/PageTemplate";
import { CoursesGroupedBySemester } from "../../utils/common/commonTypes";
import SemesterAccordion from "../../components/data-display/accordions/SemesterAccordion";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import { getCoursesGroupedBySemester } from "../../utils/data/dataUtils";
import SemesterCoursesData from "../../components/data-display/data/courses-page/SemesterCoursesData";

const LecturerPerformancesSubpage: React.FunctionComponent<any> = () => {
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
                let coursesFetchMethod = null;
                if (userRole === UserRole.STUDENT) {
                    coursesFetchMethod = () => courseViewContract.getRegisteredCourses();
                } else if (userRole === UserRole.LECTURER) {
                    coursesFetchMethod = () => courseViewContract.getCoursesLecturingAt();
                } else {
                    setCoursesGroupedBySemester([]);
                    return;
                }
                const courses = (await alertError(coursesFetchMethod, setErrorMessage)).map((course) =>
                    convertToCourseInternal(course)
                );
                setCoursesGroupedBySemester(getCoursesGroupedBySemester(courses));
            }
        })();
    }, [courseViewContract, userRole]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== UserRole.STUDENT && userRole !== UserRole.LECTURER)
        return <CenterContent>{NOT_LECTURER_OR_STUDENT}</CenterContent>;

    if (userRole === undefined || !coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="All courses">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCoursesData
                            courses={semesterCoursesGroup.courses}
                            deregisterEnabled={userRole === UserRole.STUDENT ? true : false}
                            assessmentRegAndDeregEnabled={userRole === UserRole.STUDENT ? true : false}
                            showParticipants={userRole === UserRole.LECTURER ? true : false}
                        />
                    </SemesterAccordion>
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default LecturerPerformancesSubpage;
