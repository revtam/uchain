import React from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import Navbar from "./navbar/Navbar";
import PageRoute from "../pages/pages";
import CoursesPage from "../pages/CoursesPage";
import StudyPerformancePage from "../pages/StudyPerformancePage";
import ProfilePage from "../pages/ProfilePage";
import WalletErrorAlert from "./wallet-connection/WalletErrorAlert";

// // This is the ABI coder instance
// const abiCoder = new ethers.utils.AbiCoder();

// // This is the decoded data for the nested structs
// const decodedData = abiCoder.decode(contractAbi, encodedData);

// // You can access the properties of the nested structs using the appropriate keys in the decoded data object
// console.log(decodedData.struct1.property1); // Outputs the value of property1 in struct1
// console.log(decodedData.struct1.struct2.property2); // Outputs the value of property2 in struct2, which is nested in struct1

export const App: React.FunctionComponent<any> = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Routes>
                <Route path={PageRoute.courses.path} element={<CoursesPage />} />
                <Route path={PageRoute.studyPerformance.path} element={<StudyPerformancePage />} />
            </Routes>
            <WalletErrorAlert />
        </React.Fragment>
    );
};

export default App;
