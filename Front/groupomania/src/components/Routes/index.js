import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "../../pages/SignInForm";
import SignUpForm from "../../pages/SignUpForm";
import ProtectedRoutes from "../../context/ProtectedRoutes";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm />}/>
        <Route path="/register" element={<SignUpForm/>}/>
        <Route element={<ProtectedRoutes/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
