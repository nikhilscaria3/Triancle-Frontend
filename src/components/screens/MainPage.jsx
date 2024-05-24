import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Projects from "../../pages/Projects";
import { THEME_COLORS } from "../../ThemeConfig.jsx";
import styled from "styled-components";
import NavBar from "./navbar/NavBar.jsx";
import Header from "./header/Header.jsx";
import UserManage from "../../pages/UserManage.jsx";
import WorkSettings from "../../pages/WorkSettings.jsx";
import CheckList from "../../pages/CheckList.jsx";
import Finance from "../../pages/Finance.jsx";
import AddSchedule from "../../pages/AddSchedule.jsx";
import Invoice from "../../pages/Invoice.jsx";
import EditBanner from "../../pages/EditBanner.jsx";
import HR from "../../pages/HR.jsx";
import Documents from "../../pages/Documents.jsx";
import FileUpload from "../../pages/FileUpload.jsx";
import Reports from "../../pages/Reports.jsx";
import AssignTask from "../../pages/AssignTask.jsx";
import Inventory from "../../pages/Inventory.jsx";
import Settings from "../../pages/Settings.jsx";
import Logout from "../../pages/Logout.jsx";
import Pagination from "../includes/Pagination.jsx";
import TaxInvoice from "./Invoice/TaxInvoice.jsx";
import Login from "../../pages/Login.jsx";
import SignUp from "../../pages/Signup.jsx";
import ForgotPassword from "../../pages/ForgotPassword.jsx";
import ResetPassword from "../../pages/ResetPassword.jsx";
import { createGlobalStyle } from "styled-components";
import VerifyForgotPassword from "../../pages/VerifyForgotPassword.jsx";
import Profile from "../../pages/AdminProfile.jsx";
import UserDetails from "../includes/UserDetails.jsx";
import InventoryNew from "../../pages/InventoryNew.jsx";
import Materials from "../../pages/Materials.jsx";
import ItemMaster from "../../pages/ItemMaster.jsx";
import DocumentView from "../../pages/DocumentView.jsx";

const MainPage = () => {
  const [showIconsOnly, setShowIconsOnly] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleIconsOnly = () => {
    setShowIconsOnly(!showIconsOnly);
  };

  // Define the paths where you don't want to show NavBar and Header
  const pathsWithoutNavBarAndHeader = [
    "/login",
    "/signup",
    "/forgot",
    "/verifyforgot",
    "/forgotpassword",
  ];

  // Check if the current path is in the pathsWithoutNavBarAndHeader array
  const showNavBarAndHeader = !pathsWithoutNavBarAndHeader.includes(
    location.pathname
  );


  return (
    <MainContainer darkMode={darkMode}>
      <GlobalStyle darkMode={darkMode} />
      {showNavBarAndHeader && <NavBar showIconsOnly={showIconsOnly} darkMode={darkMode} />}
      <Container darkMode={darkMode}>
        {showNavBarAndHeader && <Header toggleIconsOnly={toggleIconsOnly} darkMode={darkMode} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyforgot" element={<VerifyForgotPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/users" element={<UserManage />} />
          <Route path="/workSettings" element={<WorkSettings />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/addSchedule" element={<AddSchedule />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/taxInvoice" element={<TaxInvoice />} />
          <Route path="/editBanner" element={<EditBanner />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documentview" element={<DocumentView />} />
          <Route path="/fileUpload" element={<FileUpload />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/assignTask" element={<AssignTask />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/inventory" element={<InventoryNew />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userprofile" element={<UserDetails />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>
      {showNavBarAndHeader && (
        <DarkModeToggle darkMode={darkMode} onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </DarkModeToggle>
      )}
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  // height: 100vh;
  min-width: 100%;
  display: flex;
  // flex-direction: column;
  background: ${(props) => (props.darkMode ? "#121212" : "#f5f5f5")};
  color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
`;

const Container = styled.div`
  flex: 1;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => (props.darkMode ? "#121212" : "#f5f5f5")};
    color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  } 
  ${(props) =>
    props.darkMode &&
    `
    a, select, h2, p, button,i{
      color: #fff;
    }
    thead, tr, select {
      background-color: black;
    }

    label{
      color:#000;
    }
    
    tr {
      &:nth-child(even) {
        background-color: #000; /* Corrected color code */
      }
    }
  `}
`;

const DarkModeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
