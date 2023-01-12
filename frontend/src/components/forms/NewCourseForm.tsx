import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    useCourseControllerContract,
    useCourseViewContract,
    useStudyProgramControllerContract,
    useStudyProgramViewContract,
    useUserViewContract,
} from "../../hooks/contract/contractHooks";
import { Box, Button, Checkbox, FormControlLabel, FormLabel, Input, Stack, Typography } from "@mui/material";
import { alertError, alertErrorTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import {
    AutocompleteElement,
    Controller,
    DatePickerElement,
    FormContainer,
    SelectElement,
    SwitchElement,
    TextFieldElement,
    useFieldArray,
    useForm,
} from "react-hook-form-mui";
import {
    Assessment,
    Class,
    Course,
    CourseCreationFormType,
    GradeLevel,
    StudyProgram,
    User,
} from "../../utils/converter/internal-types/internalTypes";
import {
    convertToCourseCreationExternal,
    convertToCourseInternal,
} from "../../utils/converter/courseConverter";
import {
    convertStringToSelectOption,
    convertToStudyProgramSelectOption,
    convertToUserSelectOption,
} from "../../utils/converter/optionConverter";
import { CourseType, SemesterSeason, UserRole } from "../../utils/converter/contract-types/enums";
import { transformEnumIntoOptions } from "../../utils/common/commonUtils";
import languages from "country-list";
import DateFnsProvider from "./DateFnsProvider";
import { convertToUserInternal } from "../../utils/converter/userConverter";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";

const NewStudyProgramForm: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();
    const courseControllerContract = useCourseControllerContract();
    const userViewContract = useUserViewContract();
    const studyProgramViewContract = useStudyProgramViewContract();

    const [courses, setCourses] = useState<Course[] | undefined>(undefined);
    const [allCourseCodes, setAllCourseCodes] = useState<string[] | undefined>(undefined);
    const [lecturers, setLecturers] = useState<User[] | undefined>(undefined);
    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[] | undefined>(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);
    const [registrationPeriodRequired, setRegistrationPeriodRequired] = useState<boolean>(false);

    useEffect(() => {
        if (courseViewContract) {
            alertError(() => courseViewContract.getAllCourses(), setErrorMessage)
                .then((courses) => setCourses(courses.map((course) => convertToCourseInternal(course))))
                .catch(() => {});
            alertError(() => courseViewContract.getAllCourseCodes(), setErrorMessage)
                .then((codes) => setAllCourseCodes(codes))
                .catch(() => {});
        }
    }, [courseViewContract]);

    useEffect(() => {
        if (userViewContract) {
            alertError(() => userViewContract.getAllUsers(), setErrorMessage)
                .then((users) =>
                    setLecturers(
                        users
                            .filter((user) => user.profile.role === UserRole.LECTURER)
                            .map((lecturer) => convertToUserInternal(lecturer))
                    )
                )
                .catch(() => {});
        }
    }, [userViewContract]);

    useEffect(() => {
        if (studyProgramViewContract) {
            alertError(() => studyProgramViewContract.getAllPrograms(), setErrorMessage)
                .then((studyPrograms) =>
                    setStudyPrograms(
                        studyPrograms.map((studyProgram) => convertToStudyProgramInternal(studyProgram))
                    )
                )
                .catch(() => {});
        }
    }, [studyProgramViewContract]);

    const formContext = useForm<CourseCreationFormType>({
        defaultValues: {
            course: {
                registrationStart: undefined,
                registrationDeadline: undefined,
                deregistrationDeadline: undefined,
            },
            assessments: [],
        },
    });

    const {
        fields: classFields,
        append,
        remove,
    } = useFieldArray({
        control: formContext.control,
        name: "course.classes",
    });

    const handleCreate = useCallback(
        (data: CourseCreationFormType) => {
            setSendDisabled(true);
            alertErrorTransactionCall(
                () => courseControllerContract.createNewCourse(...convertToCourseCreationExternal(data)),
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [courseControllerContract]
    );

    const courseCodeOptions = useMemo(() => {
        if (!allCourseCodes) return [];
        return allCourseCodes.map((code) => convertStringToSelectOption(code));
    }, [allCourseCodes]);

    const courseTitleOptions = useMemo(() => {
        if (!courses) return [];
        return courses.map((course) => convertStringToSelectOption(course.title));
    }, [courses]);

    const lecturerOptions = useMemo(() => {
        if (!lecturers) return [];
        return lecturers.map((lecturer) => convertToUserSelectOption(lecturer));
    }, [lecturers]);

    const studyProgramOptions = useMemo(() => {
        if (!studyPrograms) return [];
        return studyPrograms.map((studyProgram) => convertToStudyProgramSelectOption(studyProgram));
    }, [studyPrograms]);

    const languageOptions = useMemo(() => {
        return languages.getNames().map((language) => convertStringToSelectOption(language));
    }, [languages]);

    return (
        <DateFnsProvider>
            <FormContainer formContext={formContext} onSuccess={(data) => handleCreate(data)}>
                <Stack spacing={2}>
                    <AutocompleteElement
                        label="Course title"
                        {...formContext.register("course.title")}
                        options={courseTitleOptions}
                        autocompleteProps={{ freeSolo: true }}
                        required
                    />
                    <AutocompleteElement
                        label="Course code"
                        {...formContext.register("course.code")}
                        options={courseCodeOptions}
                        autocompleteProps={{ freeSolo: true }}
                        required
                    />
                    <SelectElement
                        {...formContext.register("course.courseType")}
                        label={"Course type"}
                        options={transformEnumIntoOptions(CourseType)}
                        fullWidth
                        required
                    />
                    <Stack direction={"row"} spacing={1}>
                        <TextFieldElement
                            {...formContext.register("course.semester.year")}
                            label="Year"
                            type="number"
                            inputProps={{ min: 0 }}
                            required
                        />
                        <SelectElement
                            {...formContext.register("course.semester.season")}
                            label={"Season"}
                            options={transformEnumIntoOptions(SemesterSeason)}
                            required
                        />
                    </Stack>
                    <TextFieldElement
                        {...formContext.register("course.description")}
                        label="Description"
                        multiline
                    />
                    <TextFieldElement
                        {...formContext.register("course.examTopics")}
                        label="Examination topics"
                        multiline
                    />
                    <AutocompleteElement
                        label="Language"
                        {...formContext.register("course.language")}
                        options={languageOptions}
                        autocompleteProps={{ freeSolo: true }}
                        required
                    />
                    <TextFieldElement
                        {...formContext.register("course.ects")}
                        label="ECTS"
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                    />
                    <TextFieldElement
                        {...formContext.register("course.maxPlaces")}
                        label="Max. number of participants"
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setRegistrationPeriodRequired(event.target.checked)
                                }
                            />
                        }
                        label="Registration required"
                    />
                    {registrationPeriodRequired && (
                        <Stack spacing={2}>
                            <Stack direction={"row"} spacing={1}>
                                <FormLabel> Registration period:</FormLabel>
                                <DatePickerElement label="Start" name="course.registrationStart" required />
                                <DatePickerElement label="End" name="course.registrationDeadline" required />
                            </Stack>
                            <Stack direction={"row"} spacing={1}>
                                <FormLabel> Deregistration period:</FormLabel>
                                <DatePickerElement
                                    label="End"
                                    name="course.deregistrationDeadline"
                                    required
                                />
                            </Stack>
                        </Stack>
                    )}
                    <FormLabel> Grading criteria:</FormLabel>
                    <Stack spacing={1}>
                        <Stack direction={"row"} spacing={1}>
                            <Typography>{"Grade".padEnd(10)}</Typography>
                            <Typography>Limit percentage</Typography>
                        </Stack>
                        {Array.from(Array(4)).map((_, i) => (
                            <Stack direction={"row"} spacing={1}>
                                <Input
                                    hidden
                                    {...formContext.register(`course.gradeLevels.${i}.gradeValue`)}
                                />
                                <Typography>{i.toString().padEnd(10)}</Typography>
                                <TextFieldElement
                                    type="number"
                                    inputProps={{ min: 0, step: 0.01 }}
                                    {...formContext.register(
                                        `course.gradeLevels.${i}.minPercentageToAchieve`
                                    )}
                                    required
                                />
                            </Stack>
                        ))}
                    </Stack>
                    <AutocompleteElement
                        label="Requirement course codes"
                        name="requirementCourseCodes"
                        options={languageOptions}
                        multiple
                        required
                    />
                    {classFields.map((item, index) => (
                        <Stack direction={"row"} spacing={2} key={item.id}>
                            <DatePickerElement
                                label="Time"
                                {...formContext.register(`classes.${index}.time`)}
                                required
                            />
                            <TextFieldElement
                                {...formContext.register(`classes.${index}.place`)}
                                label="Place"
                                required
                            />
                            <Button variant="outlined" color="darkGrey" onClick={() => remove(index)}>
                                Remove
                            </Button>
                        </Stack>
                    ))}
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                            append({
                                time: new Date(),
                                place: "",
                            })
                        }
                    >
                        Append
                    </Button>

                    <Button
                        type={"submit"}
                        color={"secondary"}
                        variant="contained"
                        sx={{ py: 1, px: 4, fontWeight: 600 }}
                        disabled={sendDisabled}
                    >
                        Create
                    </Button>
                </Stack>
            </FormContainer>
        </DateFnsProvider>
    );
};

export default NewStudyProgramForm;
