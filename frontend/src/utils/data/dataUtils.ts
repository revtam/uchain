import {
    CoursesGroupedBySemester,
    CoursesGroupedByStudyProgram,
    StudyProgramsByCourse,
} from "../common/commonTypes";
import { Course } from "../converter/internal-types/internalTypes";

export const getCoursesGroupedBySemester = (courses: Course[]) => {
    const courseGroups: CoursesGroupedBySemester[] = [];
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
    return courseGroups;
};

export const getCoursesGroupedByStudyProgram = (studyProgramsByCourses: StudyProgramsByCourse[]) => {
    const coursesGroupedByStudyPrograms: CoursesGroupedByStudyProgram[] = [];
    for (const studyProgramsByCourse of studyProgramsByCourses) {
        for (const nextStudyProgram of studyProgramsByCourse.studyPrograms) {
            let studyProgramExists = false;
            for (let i = 0; i < coursesGroupedByStudyPrograms.length; ++i) {
                if (coursesGroupedByStudyPrograms[i].studyProgram.id === nextStudyProgram.id) {
                    studyProgramExists = true;
                    coursesGroupedByStudyPrograms[i].courses.push(studyProgramsByCourse.course);
                }
            }
            if (!studyProgramExists)
                coursesGroupedByStudyPrograms.push({
                    studyProgram: nextStudyProgram,
                    courses: [studyProgramsByCourse.course],
                });
        }
    }
    return coursesGroupedByStudyPrograms;
};
