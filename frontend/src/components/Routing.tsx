import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import pageRoutes from "../constants/pagesRoutes";
import CoursesPage from "../pages/courses/CoursesPage";
import StudyPerformancePage from "../pages/studyperformances/StudyPerformancesPage";
import Home from "../pages/Home";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/user/ProfilePage";
import AllStudiesPage from "../pages/studies/AllStudiesPage";
import StudiesPage from "../pages/studies/StudiesPage";
import AllCoursesPage from "../pages/courses/AllCoursesPage";
import NewStudyPage from "../pages/studies/NewStudyPage";
import RegistrationPage from "../pages/user/RegistrationPage";

export const Routing: React.FunctionComponent<any> = () => {
    return (
        <Routes>
            <Route path={pageRoutes.home} element={<Home />} />
            <Route path={pageRoutes.courses.main}>
                {/* <Route path={pageRoutes.courses.all} element={<MyCoursesPage />} /> */}
                <Route path={pageRoutes.courses.all} element={<AllCoursesPage />} />
                {/* <Route path={pageRoutes.courses.new} element={<NewCoursePage />} /> */}
            </Route>
            <Route path={pageRoutes.studies.main}>
                {/* <Route path={pageRoutes.studies.all} element={<MyStudiesPage />} /> */}
                <Route path={pageRoutes.studies.all} element={<AllStudiesPage />} />
                <Route path={pageRoutes.studies.new} element={<NewStudyPage />} />
            </Route>
            <Route path={pageRoutes.studyPerformances.main} element={<StudyPerformancePage />} />
            {/* <Route path={pageRoutes.studyPerformances.grading} element={<GradingPage />} /> */}
            <Route path={pageRoutes.admin} element={<AdminPage />} />
            <Route path={pageRoutes.profile} element={<ProfilePage />} />
            <Route path={pageRoutes.registration} element={<RegistrationPage />} />
            {/* <Route path={pageRoutes.registrations} element={<Registrations />} /> */}
        </Routes>
    );
};

export default Routing;
