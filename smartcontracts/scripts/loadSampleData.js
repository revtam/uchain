const ethers = require("ethers");
const { RPC_NODE_URL, ADMIN_PRIVATE_KEY } = require("./constants");
const {
    wallets,
    deployerAddress,
    userSamples,
    studyProgramSamples,
    courseSamples,
    assessmentSamples,
    courseParticipants,
    assessmentParticipants,
    attendances,
    evaluations,
    submissions,
} = require("./sampleData");
const { contractPaths } = require("./contractJsons");
const { getAbiFromJson, makeTransaction } = require("./utils");

const provider = ethers.providers.getDefaultProvider(RPC_NODE_URL);
const adminSigner = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);

function offsetDaysFromNow(offset) {
    const now = new Date();
    now.setDate(now.getDate() + offset);
    return now;
}

function getSeconds(date) {
    return Math.floor(date.getTime() / 1000);
}

function extractNotUnderscoredProps(propObject) {
    const notUnderscoredProps = Object.entries(propObject).filter(([key]) => !key.toString().includes("_"));
    return Object.fromEntries(notUnderscoredProps);
}

function getContract(address, abiPath) {
    return new ethers.Contract(address, getAbiFromJson(abiPath), adminSigner);
}

async function main() {
    const deployer = getContract(deployerAddress, contractPaths.deployer);
    const userDataManager = getContract(await deployer.userDataManager(), contractPaths.userDataManager);
    const programDataManager = getContract(
        await deployer.programDataManager(),
        contractPaths.programDataManager
    );
    const registrationDataManager = getContract(
        await deployer.registrationDataManager(),
        contractPaths.registrationDataManager
    );
    const courseDataManager = getContract(
        await deployer.courseDataManager(),
        contractPaths.courseDataManager
    );
    const assessmentDataManager = getContract(
        await deployer.assessmentDataManager(),
        contractPaths.assessmentDataManager
    );
    const performanceDataManager = getContract(
        await deployer.performanceDataManager(),
        contractPaths.performanceDataManager
    );

    const programIdByName = {};
    const userIdByWalletName = {};
    const courseIdByName = {};
    const assessmentIdByCourseNameAssessmentName = {};

    // add study programs
    for (const programSample of studyProgramSamples) {
        const receipt = await makeTransaction(
            () => programDataManager.createStudyProgram(programSample.name),
            "programDataManager.createStudyProgram"
        );
        programIdByName[programSample.name] = Number(receipt.events[0].data);
    }
    console.log(programIdByName);

    // add users
    let notRegistered;
    for (const userSample of userSamples) {
        if (userSample._walletName === "student5") {
            notRegistered = userSample;
            continue;
        }
        const receipt = await makeTransaction(
            () =>
                userDataManager.createUser(wallets[userSample._walletName].address, {
                    ...extractNotUnderscoredProps(userSample),
                    studyProgramIds: userSample._studyProgramNames.map(
                        (programName) => programIdByName[programName]
                    ),
                }),
            "userDataManager.createUser"
        );
        userIdByWalletName[userSample._walletName] = Number(receipt.events[0].data);
        // admin wallet has to have plenty of tokens
        await makeTransaction(
            () =>
                adminSigner.sendTransaction({
                    to: wallets[userSample._walletName].address,
                    value: ethers.utils.parseEther("1"),
                }),
            "send"
        );
    }
    console.log(userIdByWalletName);

    // add pending user
    await makeTransaction(
        () =>
            registrationDataManager.createRegistration(wallets[notRegistered._walletName].address, 0, {
                ...extractNotUnderscoredProps(notRegistered),
                studyProgramIds: notRegistered._studyProgramNames.map(
                    (programName) => programIdByName[programName]
                ),
            }),
        "registrationDataManager.createRegistration"
    );

    // add courses
    for (const courseSample of courseSamples) {
        let receipt = await makeTransaction(
            () =>
                courseDataManager.createCourse({
                    ...extractNotUnderscoredProps(courseSample),
                    registrationStart: courseSample._isRegPeriodSet
                        ? getSeconds(offsetDaysFromNow(courseSample._registrationStartOffset))
                        : 0,
                    registrationDeadline: courseSample._isRegPeriodSet
                        ? getSeconds(offsetDaysFromNow(courseSample._registrationDeadlineOffset))
                        : 0,
                    deregistrationDeadline: courseSample._isRegPeriodSet
                        ? getSeconds(offsetDaysFromNow(courseSample._deregistrationDeadlineOffset))
                        : 0,
                }),
            "courseDataManager.createCourse"
        );
        const courseId = Number(receipt.events[0].data);
        courseIdByName[courseSample.title] = courseId;
        await makeTransaction(
            () =>
                courseDataManager.addStudyPrograms(
                    courseId,
                    courseSample._studyProgramNames.map((programName) => programIdByName[programName])
                ),
            "courseDataManager.addStudyPrograms"
        );
        await makeTransaction(
            () =>
                courseDataManager.addLecturers(
                    courseId,
                    courseSample._lecturerWalletNames.map((walletName) => userIdByWalletName[walletName])
                ),
            "courseDataManager.addLecturers"
        );
    }
    console.log(courseIdByName);

    // add assessments
    for (const assessmentSample of assessmentSamples) {
        const courseId = courseIdByName[assessmentSample.courseName];
        for (const assessment of assessmentSample.assessments) {
            const receipt = await makeTransaction(
                () =>
                    assessmentDataManager.createAssessment(courseId, {
                        ...extractNotUnderscoredProps(assessment),
                        datetime: getSeconds(offsetDaysFromNow(assessment._datetimeOffset)),
                        registrationStart: assessment.isRegistrationRequired
                            ? getSeconds(offsetDaysFromNow(assessment._registrationStartOffset))
                            : 0,
                        registrationDeadline: assessment.isRegistrationRequired
                            ? getSeconds(offsetDaysFromNow(assessment._registrationDeadlineOffset))
                            : 0,
                        deregistrationDeadline: assessment.isRegistrationRequired
                            ? getSeconds(offsetDaysFromNow(assessment._deregistrationDeadlineOffset))
                            : 0,
                    }),
                "assessmentDataManager.createAssessment"
            );
            assessmentIdByCourseNameAssessmentName[assessmentSample.courseName + assessment.title] = Number(
                receipt.events[0].data
            );
        }
    }
    console.log(assessmentIdByCourseNameAssessmentName);

    // add course participants
    for (const participation of courseParticipants) {
        const courseId = courseIdByName[participation.courseName];
        for (const participantWalletName of participation.participantWalletNames) {
            await makeTransaction(
                () =>
                    courseDataManager.addParticipantToCourse(
                        courseId,
                        userIdByWalletName[participantWalletName]
                    ),
                "courseDataManager.addParticipantToCourse"
            );
        }
    }

    // add assessment participants
    for (const participation of assessmentParticipants) {
        const assessmentId =
            assessmentIdByCourseNameAssessmentName[participation.courseName + participation.assessmentName];
        for (const participantWalletName of participation.participantWalletNames) {
            await makeTransaction(
                () =>
                    assessmentDataManager.addRegistrantToAssessment(
                        assessmentId,
                        userIdByWalletName[participantWalletName]
                    ),
                "assessmentDataManager.addRegistrantToAssessment"
            );
        }
    }

    // add attendances
    for (const assessmentAttendances of attendances) {
        const assessmentId =
            assessmentIdByCourseNameAssessmentName[
                assessmentAttendances.courseName + assessmentAttendances.assessmentName
            ];
        for (const attendance of assessmentAttendances.attendances) {
            await makeTransaction(
                () =>
                    performanceDataManager.setExamAttendance(
                        userIdByWalletName[attendance._participantWalletName],
                        assessmentId,
                        attendance.hasAttended,
                        getSeconds(offsetDaysFromNow(attendance._timestampOffset))
                    ),
                "performanceDataManager.setExamAttendance"
            );
        }
    }

    // add submissions
    for (const assessmentSubmissions of submissions) {
        const assessmentId =
            assessmentIdByCourseNameAssessmentName[
                assessmentSubmissions.courseName + assessmentSubmissions.assessmentName
            ];
        for (const submission of assessmentSubmissions.submissions) {
            await makeTransaction(
                () =>
                    performanceDataManager.setOrOverrideSubmission(
                        userIdByWalletName[submission._participantWalletName],
                        assessmentId,
                        getSeconds(offsetDaysFromNow(submission._timestampOffset)),
                        ["non_existent_example.txt"]
                    ),
                "performanceDataManager.setOrOverrideSubmission"
            );
        }
    }

    // add evaluations
    for (const assessmentEvaluations of evaluations) {
        const assessmentId =
            assessmentIdByCourseNameAssessmentName[
                assessmentEvaluations.courseName + assessmentEvaluations.assessmentName
            ];
        for (const evaluation of assessmentEvaluations.evaluations) {
            await makeTransaction(
                () =>
                    performanceDataManager.setEvaluation(
                        userIdByWalletName[evaluation._participantWalletName],
                        assessmentId,
                        getSeconds(offsetDaysFromNow(evaluation._timestampOffset)),
                        evaluation.points,
                        "",
                        userIdByWalletName[evaluation._evaluatorWalletName]
                    ),
                "performanceDataManager.setEvaluation"
            );
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
