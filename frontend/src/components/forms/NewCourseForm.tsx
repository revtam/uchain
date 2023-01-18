import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    useCourseControllerContract,
    useCourseViewContract,
    useStudyProgramViewContract,
    useUserViewContract,
} from "../../hooks/contract/contractHooks";
import { Box, Button, Checkbox, FormControlLabel, FormLabel, InputAdornment, Stack } from "@mui/material";
import { alertError, alertErrorTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import {
    AutocompleteElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
    useFieldArray,
    useForm,
} from "react-hook-form-mui";
import { Course, CourseCreationFormType, StudyProgram, User } from "../../types/internal-types/internalTypes";
import {
    convertToCourseCreationExternal,
    convertToCourseInternal,
} from "../../utils/converter/courseConverter";
import {
    convertStringToSelectOption,
    convertToStudyProgramSelectOption,
    convertToUserSelectOption,
    transformEnumIntoOptions,
    transformEnumKeyIntoOption,
} from "../../utils/converter/optionConverter";
import { AssessmentType, CourseType, SemesterSeason, UserRole } from "../../types/contract-types/enums";
import { removeDuplicates } from "../../utils/common/commonUtils";
import languages from "../../constants/languages.json";
import DateFnsProvider from "./DateFnsProvider";
import { convertToUserInternal } from "../../utils/converter/userConverter";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import SubmitButton from "../data-display/action-button/SubmitButton";
import CustomDateTimePicker from "./CustomDateTimePicker";

const NewCourseForm: React.FunctionComponent<any> = () => {
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

    const formContext = useForm<CourseCreationFormType>({
        defaultValues: {
            course: {
                registrationStart: undefined,
                registrationDeadline: undefined,
                deregistrationDeadline: undefined,
                requirementCourseCodes: [],
                description: "",
                examTopics: "",
                gradeLevels: [{ gradeValue: 1 }, { gradeValue: 2 }, { gradeValue: 3 }, { gradeValue: 4 }],
            },
            assessments: [],
        },
    });
    const watchedCourseType = formContext.watch("course.courseType");
    const gradeLevels = formContext.getValues("course.gradeLevels");

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
            alertError(() => userViewContract.getAllUsers(), setErrorMessage).then((users) =>
                setLecturers(
                    users
                        .filter((user) => user.profile.role === UserRole.LECTURER)
                        .map((lecturer) => convertToUserInternal(lecturer))
                )
            );
        }
    }, [userViewContract]);

    useEffect(() => {
        if (studyProgramViewContract) {
            alertError(() => studyProgramViewContract.getAllPrograms(), setErrorMessage).then(
                (studyPrograms) =>
                    setStudyPrograms(
                        studyPrograms.map((studyProgram) => convertToStudyProgramInternal(studyProgram))
                    )
            );
        }
    }, [studyProgramViewContract]);

    const {
        fields: classFields,
        append: appendClass,
        remove: removeClass,
    } = useFieldArray({
        control: formContext.control,
        name: "course.classes",
    });

    const {
        fields: assessmentFields,
        append: appendAssessment,
        remove: removeAssessment,
    } = useFieldArray({
        control: formContext.control,
        name: "assessments",
    });

    const handleCreate = useCallback(
        (data: CourseCreationFormType) => {
            setSendDisabled(true);
            data.course.registrationStart = registrationPeriodRequired
                ? data.course.registrationStart
                : undefined;
            data.course.registrationDeadline = registrationPeriodRequired
                ? data.course.registrationDeadline
                : undefined;
            data.course.deregistrationDeadline = registrationPeriodRequired
                ? data.course.deregistrationDeadline
                : undefined;
            data.assessments = data.assessments
                .filter((assessment) => {
                    if (
                        data.course.courseType == CourseType.VO &&
                        assessment.assessmentType != AssessmentType.EXAM
                    )
                        return false;
                    return true;
                })
                .map((assessment) => {
                    assessment.isRegistrationRequired =
                        data.course.courseType == CourseType.VO ? true : false;
                    assessment.registrationStart = assessment.isRegistrationRequired
                        ? assessment.registrationStart
                        : undefined;
                    assessment.registrationDeadline = assessment.isRegistrationRequired
                        ? assessment.registrationDeadline
                        : undefined;
                    assessment.deregistrationDeadline = assessment.isRegistrationRequired
                        ? assessment.deregistrationDeadline
                        : undefined;
                    assessment.place =
                        assessment.assessmentType == AssessmentType.SUBMISSION ? "" : assessment.place;
                    return assessment;
                });
            alertErrorTransactionCall(
                () => courseControllerContract.createNewCourse(...convertToCourseCreationExternal(data)),
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [courseControllerContract, registrationPeriodRequired]
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
        return removeDuplicates(languages.map((elem) => elem.language)).map((language) =>
            convertStringToSelectOption(language.toString())
        );
    }, [languages]);

    const largeWidthSx = { sx: { width: 500 } };
    const mediumWidthSx = { sx: { width: 350 } };
    const smallWidthSx = { sx: { width: 200 } };

    return (
        <DateFnsProvider>
            <FormContainer formContext={formContext} onSuccess={(data) => handleCreate(data)}>
                <Stack spacing={2} alignItems={"start"}>
                    <Box alignSelf={"stretch"}>
                        <AutocompleteElement
                            label="Course title"
                            name={formContext.register("course.title").name}
                            options={courseTitleOptions}
                            autocompleteProps={{ freeSolo: true, autoSelect: true }}
                            required
                        />
                    </Box>
                    <Box {...mediumWidthSx}>
                        <AutocompleteElement
                            label="Course code"
                            name={formContext.register("course.code").name}
                            options={courseCodeOptions}
                            autocompleteProps={{ freeSolo: true, autoSelect: true }}
                            required
                        />
                    </Box>
                    <SelectElement
                        name={formContext.register("course.courseType").name}
                        label={"Course type"}
                        options={transformEnumIntoOptions(CourseType)}
                        required
                        {...mediumWidthSx}
                    />
                    <Stack direction={"row"} spacing={1}>
                        <TextFieldElement
                            name={formContext.register("course.semester.year").name}
                            label="Year"
                            type="number"
                            inputProps={{ min: 0 }}
                            {...smallWidthSx}
                            required
                        />
                        <SelectElement
                            name={formContext.register("course.semester.season").name}
                            label={"Season"}
                            options={transformEnumIntoOptions(SemesterSeason)}
                            required
                            {...smallWidthSx}
                        />
                    </Stack>
                    <TextFieldElement
                        name={formContext.register("course.description").name}
                        label="Description"
                        multiline
                        fullWidth
                    />
                    <TextFieldElement
                        name={formContext.register("course.examTopics").name}
                        label="Examination topics"
                        multiline
                        fullWidth
                    />
                    <Box {...mediumWidthSx}>
                        <AutocompleteElement
                            label="Language"
                            name={formContext.register("course.language").name}
                            options={languageOptions}
                            autocompleteProps={{ freeSolo: true, autoSelect: true }}
                            required
                        />
                    </Box>

                    <TextFieldElement
                        name={formContext.register("course.ects").name}
                        label="ECTS"
                        type="number"
                        inputProps={{ min: 0 }}
                        {...mediumWidthSx}
                        required
                    />
                    <TextFieldElement
                        name={formContext.register("course.maxPlaces").name}
                        label="Max. number of participants"
                        type="number"
                        inputProps={{ min: 0 }}
                        {...mediumWidthSx}
                        required
                    />
                    <Box {...mediumWidthSx}>
                        <AutocompleteElement
                            label="Requirement course codes"
                            name={formContext.register("course.requirementCourseCodes").name}
                            options={courseCodeOptions}
                            multiple
                        />
                    </Box>
                    <Box {...mediumWidthSx}>
                        <AutocompleteElement
                            label="Lecturers"
                            name={formContext.register("lecturers").name}
                            options={lecturerOptions}
                            multiple
                            required
                        />
                    </Box>
                    <Box {...mediumWidthSx}>
                        <AutocompleteElement
                            label="Study programs"
                            name={formContext.register("studyPrograms").name}
                            options={studyProgramOptions}
                            multiple
                            required
                        />
                    </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setRegistrationPeriodRequired(event.target.checked)
                                }
                            />
                        }
                        label="Registration period required"
                    />
                    {registrationPeriodRequired && (
                        <Stack spacing={2}>
                            <FormLabel> Registration period:</FormLabel>
                            <Stack direction={"row"} spacing={1}>
                                <CustomDateTimePicker
                                    control={formContext.control}
                                    name={formContext.register("course.registrationStart").name}
                                    label={"Start"}
                                    required
                                />
                                <CustomDateTimePicker
                                    control={formContext.control}
                                    name={formContext.register("course.registrationDeadline").name}
                                    label={"End"}
                                    required
                                />
                            </Stack>
                            <FormLabel> Deregistration period:</FormLabel>
                            <Stack direction={"row"} spacing={1}>
                                <CustomDateTimePicker
                                    control={formContext.control}
                                    name={formContext.register("course.deregistrationDeadline").name}
                                    label={"End"}
                                    required
                                />
                            </Stack>
                        </Stack>
                    )}
                </Stack>
                <Stack spacing={4} alignItems={"start"} marginTop={4}>
                    <Box>
                        <Box marginBottom={1.5}>
                            <FormLabel> Grading criteria</FormLabel>
                        </Box>
                        <Stack spacing={1}>
                            {gradeLevels.map((grade, i) => (
                                <TextFieldElement
                                    key={i}
                                    type="number"
                                    label={`Grade ${grade.gradeValue}`}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">min. % (&gt;=)</InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 0,
                                            step: 0.01,
                                        },
                                    }}
                                    name={
                                        formContext.register(`course.gradeLevels.${i}.minPercentageToAchieve`)
                                            .name
                                    }
                                    required
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Box marginBottom={1.5}>
                            <FormLabel> Classes</FormLabel>
                        </Box>
                        <Stack spacing={1}>
                            {classFields.map((item, index) => (
                                <Stack direction={"row"} spacing={2} key={item.id}>
                                    <CustomDateTimePicker
                                        control={formContext.control}
                                        name={formContext.register(`course.classes.${index}.time`).name}
                                        label={"Time"}
                                        required
                                    />
                                    <TextFieldElement
                                        name={formContext.register(`course.classes.${index}.place`).name}
                                        label="Place"
                                        required
                                    />
                                    <Button
                                        variant="outlined"
                                        color="darkGrey"
                                        onClick={() => removeClass(index)}
                                    >
                                        Remove
                                    </Button>
                                </Stack>
                            ))}
                            <Button
                                variant="outlined"
                                color="secondary"
                                {...mediumWidthSx}
                                onClick={() =>
                                    appendClass({
                                        time: new Date(),
                                        place: "",
                                    })
                                }
                            >
                                Add
                            </Button>
                        </Stack>
                    </Box>

                    <Box>
                        <Box marginBottom={1.5}>
                            <FormLabel> Assessments</FormLabel>
                        </Box>
                        <Stack spacing={3} {...largeWidthSx}>
                            {assessmentFields.map((item, index) => {
                                const watchedAssessmentType = formContext.watch(
                                    `assessments.${index}.assessmentType`
                                );
                                if (
                                    watchedCourseType == CourseType.VO &&
                                    watchedAssessmentType != AssessmentType.EXAM
                                )
                                    return;
                                return (
                                    <Stack spacing={2} key={item.id}>
                                        <SelectElement
                                            name={
                                                formContext.register(`assessments.${index}.assessmentType`)
                                                    .name
                                            }
                                            label={"Type"}
                                            options={
                                                watchedCourseType == CourseType.VO
                                                    ? [
                                                          transformEnumKeyIntoOption(
                                                              AssessmentType.EXAM,
                                                              AssessmentType
                                                          ),
                                                      ]
                                                    : transformEnumIntoOptions(AssessmentType)
                                            }
                                            required
                                        />
                                        <TextFieldElement
                                            name={formContext.register(`assessments.${index}.title`).name}
                                            label="Title"
                                            required
                                        />
                                        <CustomDateTimePicker
                                            control={formContext.control}
                                            name={formContext.register(`assessments.${index}.datetime`).name}
                                            label={
                                                watchedAssessmentType == AssessmentType.EXAM
                                                    ? "Time"
                                                    : "Deadline"
                                            }
                                            required
                                        />
                                        {watchedAssessmentType != AssessmentType.SUBMISSION && (
                                            <TextFieldElement
                                                label="Place"
                                                name={formContext.register(`assessments.${index}.place`).name}
                                                required
                                            />
                                        )}
                                        <TextFieldElement
                                            label="Max. points"
                                            name={formContext.register(`assessments.${index}.maxPoints`).name}
                                            type="number"
                                            inputProps={{ min: 0, step: 1 }}
                                            required
                                        />
                                        <TextFieldElement
                                            label="Min. points (If not achieved, the course is failed automatically.)"
                                            name={formContext.register(`assessments.${index}.minPoints`).name}
                                            type="number"
                                            inputProps={{ min: 0, step: 1 }}
                                            required
                                        />
                                        {watchedCourseType == CourseType.VO && (
                                            <Stack spacing={2}>
                                                <FormLabel> Registration period:</FormLabel>
                                                <CustomDateTimePicker
                                                    control={formContext.control}
                                                    name={
                                                        formContext.register(
                                                            `assessments.${index}.registrationStart`
                                                        ).name
                                                    }
                                                    label={"Start"}
                                                    required
                                                />
                                                <CustomDateTimePicker
                                                    control={formContext.control}
                                                    name={
                                                        formContext.register(
                                                            `assessments.${index}.registrationDeadline`
                                                        ).name
                                                    }
                                                    label={"End"}
                                                    required
                                                />
                                                <FormLabel> Deregistration period:</FormLabel>
                                                <CustomDateTimePicker
                                                    control={formContext.control}
                                                    name={
                                                        formContext.register(
                                                            `assessments.${index}.deregistrationDeadline`
                                                        ).name
                                                    }
                                                    label={"End"}
                                                    required
                                                />
                                            </Stack>
                                        )}

                                        <Button
                                            variant="outlined"
                                            color="darkGrey"
                                            onClick={() => removeAssessment(index)}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                );
                            })}
                            <Button
                                variant="outlined"
                                color="secondary"
                                {...mediumWidthSx}
                                onClick={() =>
                                    appendAssessment({
                                        id: "",
                                        title: "",
                                        datetime: new Date(),
                                        place: "",
                                        assessmentType: AssessmentType.EXAM,
                                        maxPoints: 0,
                                        minPoints: 0,
                                        isRegistrationRequired: false,
                                        registrationStart: undefined,
                                        registrationDeadline: undefined,
                                        deregistrationDeadline: undefined,
                                    })
                                }
                            >
                                Add
                            </Button>
                        </Stack>
                    </Box>

                    <SubmitButton text={"Create"} disabled={sendDisabled} />
                </Stack>
            </FormContainer>
        </DateFnsProvider>
    );
};

export default NewCourseForm;
