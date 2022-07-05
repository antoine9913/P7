import React from 'react';
import Header from './Header';

import './navbarHome.css'

const NavBarHome = () => {

    const storage = JSON.parse(localStorage.getItem('User'));

    return (
        <div className="navHome-container">
            <Header />
            <br />
            <h5>Bienvenue {storage.username}</h5>
         </div>
    );
};

export default NavBarHome;