import React from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import PageRoute from "../pages/pages";
import CoursesPage from "../pages/CoursesPage";
import StudyPerformancePage from "../pages/StudyPerformancePage";
import Home from "../pages/Home";

export const Routing: React.FunctionComponent<any> = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={PageRoute.courses.path} element={<CoursesPage />} />
            <Route path={PageRoute.studyPerformance.path} element={<StudyPerformancePage />} />
        </Routes>
    );
};

export default Routing;
