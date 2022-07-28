import React from 'react';
import NavBarHome from '../components/Layout/Header/NavBarHome';
import Thread from '../components/Publication/Thread';

import './home.css'

const Home = () => {
    return (
        <div className="home">
                <NavBarHome />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;