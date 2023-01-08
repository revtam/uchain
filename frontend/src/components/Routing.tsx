import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import pageRoutes from "../constants/pagesRoutes";
import CoursesPage from "../pages/CoursesPage";
import StudyPerformancePage from "../pages/StudyPerformancePage";
import Home from "../pages/Home";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/ProfilePage";
import AllStudiesPage from "../pages/AllStudiesPage";
import StudiesPage from "../pages/StudiesPage";

export const Routing: React.FunctionComponent<any> = () => {
    return (
        <Routes>
            <Route path={pageRoutes.home} element={<Home />} />
            <Route path={pageRoutes.courses.main} element={<CoursesPage />} />
            {/* <Route path={pageRoutes.courses.all} element={<AllCoursesPage />} />
            <Route path={pageRoutes.courses.new} element={<NewCoursePage />} /> */}
            <Route path={pageRoutes.studies.main} element={<StudiesPage />} />
            <Route path={pageRoutes.studies.all} element={<AllStudiesPage />} />
            {/* <Route path={pageRoutes.studies.new} element={<NewStudyPage />} /> */}
            <Route path={pageRoutes.studyPerformances} element={<StudyPerformancePage />} />
            <Route path={pageRoutes.admin} element={<AdminPage />} />
            <Route path={pageRoutes.profile} element={<ProfilePage />} />
            {/* <Route path={pageRoutes.registrations} element={<Registrations />} /> */}
        </Routes>
    );
};

export default Routing;
