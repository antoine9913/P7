import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UseAuth = () => {
const user = { loggedIn: false };
return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = UseAuth();
    return isAuth ? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;