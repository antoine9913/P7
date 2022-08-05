import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from '../../../api/axios';
import { NavLink } from 'react-router-dom';

import { faAngleDown, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from '../../Login/Logout/Logout';

import './navbarHome.css'

const NavBarHome = () => {

    const [users, setUsers] = useState([]);

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;
    
    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const usersData = await axios.get(`api/users/profile/${storage.userId}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                setUsers(usersData.data);
            } catch (err) {}
        };
        fetchProfil();
    }, [token]);

    return (
        <div className="navHome-container">
            <Header />
            <nav className='navbar-User-Informations'>
                <li className='navbar-button'>
                    <div className='navbar-menu'>
                        <img className='navbar-avatar' crossOrigin='anonymous' src={users.avatar} alt="avatar" />
                        <h5>Bienvenue {users.username}</h5> 
                        <FontAwesomeIcon icon={faAngleDown} className='navbar-svg'/>
                    </div>
                <ul className="left-nav-container">
                        <li className='left-nav-link'>
                        <NavLink to='/home' >
                                    <FontAwesomeIcon icon={faHouse}/>
                                    <h4>Acceuil</h4>
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to='/profil' >
                                    <FontAwesomeIcon icon={faUser}/>
                                    <h4>Profil</h4>
                        </NavLink>
                        </li>
                        <li>
                            <Logout />
                        </li>
                </ul>
                </li>
                </nav>
            </div>
    );
};

export default NavBarHome;