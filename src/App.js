import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/login/login';
import RegistrationForm from "./components/login/registration";
import ForgotPasswordForm from "./components/login/forgotpassword";
import ResetPasswordForm from "./components/login/resetpassword";
import Dashboard from "./components/dashboard/dashboardAfter";
import DashboardBefore from './components/dashboard/dashboardBefore';

const App = () => {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<DashboardBefore />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/forgetpassword" element={<ForgotPasswordForm />} />
        <Route path="/reset_password" element={<ResetPasswordForm />} />
        <Route path="/Dashboard" element={<Dashboard />} />
       
     
      </Routes>

    </Router>
  );
};

export default App;
