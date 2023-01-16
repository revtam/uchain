import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import pageRoutes from "../constants/pagesRoutes";
import StudyPerformancePage from "../pages/studyperformances/StudyPerformancesPage";
import Home from "../pages/Home";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/user/ProfilePage";
import AllStudiesPage from "../pages/studies/AllStudiesPage";
import AllCoursesPage from "../pages/courses/AllCoursesPage";
import NewStudyPage from "../pages/studies/NewStudyPage";
import RegistrationPage from "../pages/user/RegistrationPage";
import CoursesPage from "../pages/courses/CoursesPage";
import NewCoursePage from "../pages/courses/NewCoursePage";
import StudiesPage from "../pages/studies/StudiesPage";
import GradingPage from "../pages/grading/GradingPage";
import RegistrationsPage from "../pages/user/RegistrationsPage";
import CourseAssignPage from "../pages/courses/CourseAssignPage";

export const Routing: React.FunctionComponent<any> = () => {
    return (
        <Routes>
            <Route path={pageRoutes.home} element={<Home />} />
            <Route path={pageRoutes.courses.main} element={<CoursesPage />} />
            <Route path={pageRoutes.courses.all} element={<AllCoursesPage />} />
            <Route path={pageRoutes.courses.new} element={<NewCoursePage />} />
            <Route path={pageRoutes.courses.assign} element={<CourseAssignPage />} />
            <Route path={pageRoutes.studies.main} element={<StudiesPage />} />
            <Route path={pageRoutes.studies.all} element={<AllStudiesPage />} />
            <Route path={pageRoutes.studies.new} element={<NewStudyPage />} />
            <Route path={pageRoutes.studyPerformances.main} element={<StudyPerformancePage />} />
            <Route path={pageRoutes.studyPerformances.grading} element={<GradingPage />} />
            <Route path={pageRoutes.admin} element={<AdminPage />} />
            <Route path={pageRoutes.profile} element={<ProfilePage />} />
            <Route path={pageRoutes.registration} element={<RegistrationPage />} />
            <Route path={pageRoutes.registrations} element={<RegistrationsPage />} />
        </Routes>
    );
};

export default Routing;
