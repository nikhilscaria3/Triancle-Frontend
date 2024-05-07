import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/LoginComponent";
import { checkAdminStatus, isAuthenticated, isMaintenanceMode, useCheckAdminStatus } from "./Auth/UserAuth"; // Import the isAuthenticated function
import MaintenancePage from "./Components/Error/MaintenancePage";
import Dashboard from "./Components/DashboardComponent";
import User from "./Components/UserComponent";
import Project from "./Components/ProjectComponent";
import File from "./Components/FileComponent";
import ViewFile from "./Components/ViewFileComponent";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Test from "./Components/TestComponent";
import Favfile from "./Components/FavFileComponent";
import CategoryComponent from "./Components/CategoryComponent";
import SubCategoryComponent from "./Components/SubCategoryComponent";
import AssignedFile from "./Components/AssignFileComponent";

const PrivateAdminRoute = ({ element, ...rest }) => {
  const isAdmin = useCheckAdminStatus()
  console.log("isAdmin", isAdmin);
  return isAdmin ? (
    element
  ) : (
    <Navigate to="/dashboard" replace={true} />
  );
};


const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" replace={true} />
  );
};

const PrivateLoginRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    element
  );
};

const App = () => {
  if (isMaintenanceMode()) {
    return <MaintenancePage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLoginRoute element={<Login />} />} />
        <Route path="/forgot" element={<PrivateLoginRoute element={<ForgotPassword />} />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/user"
          element={<PrivateAdminRoute element={<User />} />}
        />
        <Route
          path="/project"
          element={<PrivateAdminRoute element={<Project />} />}
        />
        <Route
          path="/file"
          element={<PrivateRoute element={<File />} />}
        />
        <Route
          path="/favfile"
          element={<PrivateRoute element={<Favfile />} />}
        />
        <Route
          path="/viewfile"
          element={<PrivateRoute element={<ViewFile />} />}
        />

        <Route
          path="/category"
          element={<PrivateAdminRoute element={<CategoryComponent />} />}
        />

        <Route
          path="/subcategory"
          element={<PrivateAdminRoute element={<SubCategoryComponent />} />}
        />

        <Route
          path="/assignedfile"
          element={<PrivateRoute element={<AssignedFile />} />}
        />

        <Route path="/test" element={<PrivateRoute element={<Test />} />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;