import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
// import NavbarRes from './component/navbar/NavbarRes';
import Login from "./component/login/Login";
import Register from "./component/signup/Register";
import SignUp from "./component/signup/SignUp";
import Home from "./component/landing_page/Home";
import Main from "./component/Main/Main";
import Rescources from "./component/Rescources/Rescources";
// import RescourcesDisplay from './component/Rescources/RescourcesDisplay'
import RescourcesTable from "./component/Rescources/RescourcesTable";
import Faq from "./component/Faq";
import Approvals from "./component/approvals/Approvals";
import ProfilePage from "./component/Profile/ProfilePage";
import NewLogin from "./component/login/NewLogin";
import AttendanceSheet from "./component/Calendar/AttendanceSheet";
import NavbarRes from "./component/navbar/NavbarRes";
import ReactBigCalendar from "./component/Calendar/ReactBigCalendar";
import Error from "./component/Error";

const AnimatedRoutes = () => {
    const location = useLocation();
  return (
    <div>
        <NavbarRes />
        <Routes location={location} key={location.pathname}>
        <Route index path="/main" element={<Main />} strict />
    <Route index path="/calendar" element={<ReactBigCalendar />} strict />
    <Route index path="/rescources" element={<Rescources />} strict />
    <Route index path="/profile" element={<ProfilePage />} strict />
    <Route
      index
      path="/rescourcesDisplay"
      element={<RescourcesTable />}
      strict
    />
    <Route index path="/faq" element={<Faq />} strict />
    <Route index path="/approvals" element={<Approvals />} strict />
    <Route index path="/attendance" element={<AttendanceSheet />} strict />
        </Routes>
    </div>
  )
}

export default AnimatedRoutes