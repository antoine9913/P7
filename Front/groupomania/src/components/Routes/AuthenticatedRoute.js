import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Auth from '../../context/Auth';

const AuthenticatedRoute = ({ path, component}) => {
    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? (
        <Route exact path={path} component={component} />
    ) : (
        <Redirect to='/'/>
    )
};

export default AuthenticatedRoute;