import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../context/AppContext';

const NavBar = () => {
    const uid = useContext(UidContext);

    return (
        <div className="nav-container">
            <div className="logo">
                <NavLink exact to="/home" >
                <div className="logo">
                    <img src="../images/icon-left-font.svg" alt="logo" />
                </div>
                </NavLink>
            </div>
            {uid ? (
                <ul>
                    <li></li>
                    <li className="welcome">
                        <NavLink exact to="/profil">
                            <h5>Bienvenue 'Pseudo'</h5>
                        </NavLink>
                    </li>

                </ul>
            ) : (
                <ul>
                    <li></li>
                    <li>
                        <NavLink exact to='/'>
                            <img src="../images/icons/login.svg" alt="login" />
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default NavBar;