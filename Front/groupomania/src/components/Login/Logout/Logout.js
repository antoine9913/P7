import React from 'react';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';

const Logout = () => {

    const logoutHandler = (event) => {
        event.preventDefault();
        localStorage.clear()
        window.location = '/';
    };

    return (
        <NavLink to='/' onClick={logoutHandler} exact activeClassName="active-left-nav">
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </NavLink>
    );

};

export default Logout;