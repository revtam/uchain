import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useMemo, useState } from "react";
import { useCourseViewContract } from "../hooks/contract/contractHooks";
import CenterContent from "../components/data-display/CenterContent";
import LoadingBox from "../components/LoadingBox";
import { convertToCourseInternal } from "../utils/converter/courseConverter";
import { LOG_IN, NOT_LECTURER_OR_STUDENT, NOT_REGISTERED } from "../constants/authMessages";
import useErrorStore from "../hooks/error/errorHooks";
import { alertError } from "../utils/contract/contractUtils";
import PageTemplate from "./PageTemplate";
import { CoursesGroupedBySemester } from "../utils/common/commonTypes";
import SemesterAccordion from "../components/data-display/accordions/SemesterAccordion";
import useAuthStore from "../hooks/auth/authHooks";
import { UserRole } from "../utils/converter/contract-types/enums";
import { CourseAccordionConfigProps } from "../components/data-display/accordions/CourseAccordion";

const CoursesPage: React.FunctionComponent<any> = () => {
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
                const courseGroups: CoursesGroupedBySemester[] = [];
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
                for (const course of courses) {
                    let semesterExists = false;
                    for (let i = 0; i < courseGroups.length; ++i) {
                        if (
                            courseGroups[i].semester.season === course.semester.season &&
                            courseGroups[i].semester.year === course.semester.year
                        ) {
                            semesterExists = true;
                            courseGroups[i].courses.push(course);
                            break; // course can only be at one semester
                        }
                    }
                    if (!semesterExists) courseGroups.push({ semester: course.semester, courses: [course] });
                }
                setCoursesGroupedBySemester(courseGroups);
            }
        })();
    }, [courseViewContract]);

    const accordionProps = useMemo((): CourseAccordionConfigProps | undefined => {
        if (userRole === UserRole.STUDENT)
            return {
                deregisterEnabled: true,
                assessmentRegAndDeregEnabled: true,
            };
        if (userRole === UserRole.LECTURER)
            return {
                showParticipants: true,
            };
    }, [userRole]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== UserRole.STUDENT && userRole !== UserRole.LECTURER)
        return <CenterContent>{NOT_LECTURER_OR_STUDENT}</CenterContent>;

    if (userRole === undefined) return <LoadingBox />;

    if (!coursesGroupedBySemester) return <LoadingBox />;

    return (
        <PageTemplate pageTitle="All courses">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((courseGroup, index) => (
                    <SemesterAccordion
                        semester={courseGroup.semester}
                        courses={courseGroup.courses}
                        key={index}
                        {...accordionProps}
                    />
                ))
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default CoursesPage;
