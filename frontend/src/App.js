import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/LoginComponent";
import Signup from "./Components/SignupComponent";
import { isAuthenticated, isMaintenanceMode } from "./Auth/UserAuth"; // Import the isAuthenticated function
import MaintenancePage from "./Components/Error/MaintenancePage";
import Test from "./Components/TestComponent";
import Dashboard from "./Components/DashboardComponent";
import User from "./Components/UserComponent";
import Project from "./Components/ProjectComponent";


const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace={true} />
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
        <Route path="/login" element={<PrivateLoginRoute element={<Login />} />} />
        <Route path="/" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/user"
          element={<PrivateRoute element={<User />} />}
        />
        <Route
          path="/project"
          element={<PrivateRoute element={<Project />} />}
        />

        <Route
          path="/test"
          element={<PrivateRoute element={<Test />} />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;