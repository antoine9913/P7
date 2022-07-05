import React from 'react';
import { NavLink } from 'react-router-dom';
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from '../../Login/Logout/Logout';

import './leftbarNav.css'

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/home' exact activeClassName="active-left-nav">
                    <FontAwesomeIcon icon={faHouse}/>
          </NavLink>
          <br/>
          <NavLink to='/profil' exact activeClassName="active-left-nav">
                    <FontAwesomeIcon icon={faUser}/>
          </NavLink>
          <br />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;