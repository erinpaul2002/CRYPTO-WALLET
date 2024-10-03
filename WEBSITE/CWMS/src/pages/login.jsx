/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SignInForm from '../components/user_components/signinform';
import SignUpForm from '../components/user_components/signupform';
import '../styles/userstyles/login.css';

const Login = () => {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
    return;
  };

  const containerClass = `user-container ${type === 'signUp' ? 'user-right-panel-active' : ''}`;

  return (
    <div className="user-App">
      <div className={containerClass} id="user-container">
        <SignUpForm />
        <SignInForm />
        <div className="user-overlay-container">
          <div className="user-overlay">
            <div className="user-overlay-panel user-overlay-left">
              <h1>Welcome Back!</h1>
              <p>To stay connected with us, please login with your personal info</p>
              <button className="user-ghost" id="signIn" onClick={() => handleOnClick('signIn')}>
                Sign In
              </button>
            </div>
            <div className="user-overlay-panel user-overlay-right">
              <h1>New User?</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="user-ghost" id="signUp" onClick={() => handleOnClick('signUp')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;