import React from 'react';
import LeftNav from '../components/Layout/LeftBarNav/LeftNav'
import NavBarHome from '../components/Layout/Header/NavBarHome';
import Thread from '../components/Publication/Thread';

import './home.css'

const Home = () => {
    return (
        <div className="home">
                <NavBarHome />
            <div className="main">
                <LeftNav />
                <Thread />
            </div>
        </div>
    );
};

export default Home;