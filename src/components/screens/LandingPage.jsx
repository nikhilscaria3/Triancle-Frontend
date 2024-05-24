import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
//components imports
import MainPage from "./MainPage.jsx";

export default function LandingPage() {
  return (
    <Router>
      <MainPage />
    </Router>
  );
}
