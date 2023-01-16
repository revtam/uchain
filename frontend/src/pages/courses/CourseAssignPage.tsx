import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { LOG_IN, NOT_REGISTERED, NOT_SPM } from "../../constants/authMessages";
import PageTemplate from "../../components/data-display/PageTemplate";
import useAuthStore from "../../hooks/auth/authHooks";
import { UserRole } from "../../utils/converter/contract-types/enums";
import {
    useCourseControllerContract,
    useCourseViewContract,
    useUserViewContract,
} from "../../hooks/contract/contractHooks";
import { Course, User } from "../../utils/converter/internal-types/internalTypes";
import { alertError, alertErrorTransactionCall } from "../../utils/contract/contractUtils";
import { convertToUserInternal } from "../../utils/converter/userConverter";
import useErrorStore from "../../hooks/error/errorHooks";
import { convertToCourseInternal } from "../../utils/converter/courseConverter";
import { AutocompleteElement, FormContainer, useForm } from "react-hook-form-mui";
import { Box, Stack } from "@mui/material";
import { convertToUserSelectOption } from "../../utils/converter/optionConverter";
import { SelectOption } from "../../utils/common/commonTypes";
import SubmitButton from "../../components/data-display/action-button/SubmitButton";

const CourseAssignPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();
    const userViewContract = useUserViewContract();
    const userControllerContract = useCourseControllerContract();

    const [courses, setCourses] = useState<Course[] | undefined>(undefined);
    const [students, setStudents] = useState<User[] | undefined>(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const formContext = useForm<{ courseId: string; studentId: string }>({});

    useEffect(() => {
        if (!userViewContract) return;
        alertError(() => userViewContract.getAllUsers(), setErrorMessage).then((users) =>
            setStudents(
                users
                    .filter((user) => user.profile.role === UserRole.STUDENT)
                    .map((lecturer) => convertToUserInternal(lecturer))
            )
        );
    }, [userViewContract]);

    useEffect(() => {
        if (!courseViewContract) return;
        alertError(() => courseViewContract.getAllCourses(), setErrorMessage)
            .then((courses) => setCourses(courses.map((course) => convertToCourseInternal(course))))
            .catch(() => {});
    }, [courseViewContract]);

    const handleRegister = useCallback(
        (data: { courseId: string; studentId: string }) => {
            if (!userControllerContract) return;
            setSendDisabled(true);
            alertErrorTransactionCall(
                () => userControllerContract.addStudentToCourse(data.courseId, data.studentId),
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [userControllerContract]
    );

    const courseOptions: SelectOption[] = useMemo(() => {
        if (!courses) return [];
        return courses.map((course) => ({ id: course.id, label: `${course.title} - ${course.id}` }));
    }, [courses]);

    const studentOptions = useMemo(() => {
        if (!students) return [];
        return students.map((student) => convertToUserSelectOption(student));
    }, [students]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.STUDY_PROGRAM_MANAGER)
        return <CenterContent>{NOT_SPM}</CenterContent>;

    if (userRole === undefined) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="Add student to course">
            <FormContainer formContext={formContext} onSuccess={(data) => handleRegister(data)}>
                <Stack spacing={2} alignItems={"baseline"}>
                    <Box alignSelf={"stretch"}>
                        <AutocompleteElement
                            label="Course"
                            name={formContext.register("courseId").name}
                            options={courseOptions}
                            required
                        />
                    </Box>
                    <Box alignSelf={"stretch"}>
                        <AutocompleteElement
                            label="Student"
                            name={formContext.register("studentId").name}
                            options={studentOptions}
                            required
                        />
                    </Box>
                    <SubmitButton text={"Add"} disabled={sendDisabled} />
                </Stack>
            </FormContainer>
        </PageTemplate>
    );
};

export default CourseAssignPage;
