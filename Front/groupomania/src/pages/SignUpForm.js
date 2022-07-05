import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import Header from '../components/Layout/Header/Header';
import Register from '../components/Login/SignUp/SignUpForm'

const SignUpForm = () => {
    return (
        <div className="SignUpForm-page">
            <div className="SignUpForm-container">
                <Header />
                <Register />
                <Footer />
            </div>
        </div>
    );
};

export default SignUpForm;