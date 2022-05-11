import React from 'react';
import Log from '../components/Login/SignInForm'

const SignInForm = () => {
    return (
        <div className="SignInForm-page">
            <div className="SignInForm-container">
                    <Log />
                <div className="img-container">
                    <img src="./images/icon-left-font.svg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignInForm;