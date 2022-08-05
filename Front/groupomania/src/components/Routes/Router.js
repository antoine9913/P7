import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "../../pages/SignInForm";
import SignUpForm from "../../pages/SignUpForm";
import ProtectedRoute from "../../context/ProtectedRoute";
import Home from "../../pages/Home";
import AllProfil from "../Profil/AllProfil/AllProfil";
import UpdateProfil from "../Profil/UpdateProfil/UpdateProfil";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<AllProfil />} />
          <Route path="/updateProfil" element={<UpdateProfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
