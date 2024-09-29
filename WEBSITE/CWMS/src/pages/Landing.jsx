/* eslint-disable no-unused-vars */   
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css'; // Make sure this path is correct
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component

const Landing = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleUserClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      navigate('/login');
    }, 1000); // 1 second delay
  };

  const handleAdminClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      navigate('/adminlogin');
    }, 1000); // 1 second delay
  };

  return (
    <div className='body1'>
      <div className="landing-container">
        {loading ? (
          <LoadingSpinner /> // Conditionally render the loading spinner
        ) : (
          <>
            <h1 className="landing-title">Welcome To CryptoX</h1>
            <h6 className="landing-subtitle">Your Secure Wallet.</h6>
            <div className="button-container">
              <button onClick={handleUserClick}>User</button>
              <button onClick={handleAdminClick}>Admin</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;