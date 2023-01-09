import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../hooks/contract/contractHooks";
import { Course } from "../utils/converter/internal-types/internalTypes";
import CenterContent from "../components/data-display/CenterContent";
import LoadingBox from "../components/LoadingBox";
import { convertToCourseInternal } from "../utils/converter/courseConverter";
import { LOG_IN } from "../constants/authMessages";
import useErrorStore from "../hooks/error/errorHooks";
import { alertError } from "../utils/contract/contractUtils";
import PageTemplate from "./PageTemplate";
import CourseAccordion from "../components/data-display/accordions/CourseAccordion";

const AllCoursesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();

    const [courses, setCourses] = useState<Course[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setCourses(
                    (await alertError(() => courseViewContract.getAllCourses(), setErrorMessage)).map(
                        (course) => convertToCourseInternal(course)
                    )
                );
            }
        })();
    }, [courseViewContract]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (courses === undefined) return <LoadingBox />;

    return (
        <PageTemplate pageTitle="All courses">
            {courses.length > 0 ? (
                courses.map((course, index) => <CourseAccordion course={course} key={index} />)
            ) : (
                <CenterContent>No courses</CenterContent>
            )}
        </PageTemplate>
    );
};

export default AllCoursesPage;
