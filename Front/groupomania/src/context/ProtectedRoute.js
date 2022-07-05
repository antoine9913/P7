import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UseAuth = () => {

    
const user = { loggedIn: true };
return user && user.loggedIn;
};

const ProtectedRoute = () => {
    const isAuth = UseAuth();
    return isAuth ? <Outlet/> : <Navigate to="/"/>;
};

export default ProtectedRoute; 