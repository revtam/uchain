import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useCourseViewContract, useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
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
import { UserRole } from "../../types/contract-types/enums";
import { getCoursesGroupedBySemester } from "../../utils/data/dataUtils";
import SemesterCourses from "../../components/data-display/data/nested-components/top-level/SemesterCourses";
import CourseInfo, {
    CourseInfoStaticProps,
} from "../../components/data-display/data/nested-components/top-level/CourseInfo";
import { supplyStaticProps } from "../../utils/common/commonUtils";
import { CourseProp } from "../../components/data-display/data/props";
import { StudyProgram } from "../../types/internal-types/internalTypes";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";

const CoursesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();
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
        })();
    }, [courseViewContract, userRole]);

    useEffect(() => {
        if (!studyProgramViewContract || userRole !== UserRole.STUDENT) return;
        (async () => {
            setEnrolledStudyPrograms(
                (await studyProgramViewContract.getEnrolledPrograms()).map((studyProgram) =>
                    convertToStudyProgramInternal(studyProgram)
                )
            );
        })();
    }, [studyProgramViewContract, userRole]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.STUDENT && userRole !== UserRole.LECTURER)
        return <CenterContent>{NOT_LECTURER_OR_STUDENT}</CenterContent>;

    if (userRole === undefined || !coursesGroupedBySemester) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Your registered courses">
            {coursesGroupedBySemester.length > 0 ? (
                coursesGroupedBySemester.map((semesterCoursesGroup, index) => (
                    <SemesterAccordion semester={semesterCoursesGroup.semester} key={index}>
                        <SemesterCourses
                            courses={semesterCoursesGroup.courses}
                            courseRegAndDeregEnabled={userRole === UserRole.STUDENT ? true : false}
                            relevantStudyPrograms={enrolledStudyPrograms}
                            courseAccordionContentComponent={supplyStaticProps<
                                CourseProp,
                                CourseInfoStaticProps
                            >(CourseInfo, {
                                assessmentRegAndDeregEnabled: userRole === UserRole.STUDENT ? true : false,
                                showParticipants: userRole === UserRole.LECTURER ? true : false,
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

export default CoursesPage;
