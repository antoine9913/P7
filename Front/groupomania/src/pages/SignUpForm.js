import React from 'react';
import Register from '../components/Login/SignUpForm'

const SignUpForm = () => {
    return (
        <div className="SignUpForm-page">
            <div className="SignUpForm-container">
                    <Register />
                <div className="img-container">
                    <img src="./images/icon-left-font.svg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;