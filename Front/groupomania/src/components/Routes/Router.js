import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "../../pages/SignInForm";
import SignUpForm from "../../pages/SignUpForm";
import Home from "../../pages/Home";
import NavBar from "../NavBar";
import { hasAuthenticated } from "../../services/AuthApi";
import Auth from "../../context/Auth";
import AuthenticatedRoute from "./AuthenticatedRoute";

const index = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}} >
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<SignInForm />}/>
        <Route path="/register" element={<SignUpForm/>}/>
        <AuthenticatedRoute path="/home" element={<Home/>}/>
        {/* <AuthenticatedRoute path="/profil" element={<Profil/>} /> */}
      </Routes>
    </BrowserRouter>
    </Auth.Provider>
  );
};

export default index;
