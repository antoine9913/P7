import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/home' exact activeClassName="active-left-nav">
            <img src="./images/icons/home.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/profil' exact activeClassName="active-left-nav">
            <img src="./images/icons/user.svg" alt="profil"/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;