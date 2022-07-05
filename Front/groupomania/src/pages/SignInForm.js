import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import Header from '../components/Layout/Header/Header';
import Log from '../components/Login/SignIn/SignInForm'

const SignInForm = () => {
    return (
        <div className="SignInForm-page">
            <div className="SignInForm-container">
                <Header />
                <Log />
                <Footer />
            </div>
        </div>
    );
};

export default SignInForm;