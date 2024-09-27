/* eslint-disable no-unused-vars */
//admin dash
import React,{ useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admindash.css'
import ViewCrypto from '../components/ViewCrypto';
import UpdateCrypto from '../components/UpdateCrypto'
import AddCrypto from '../components/AddCrypto';
import DeleteCrypto from '../components/DeleteCrypto';

// eslint-disable-next-line react/prop-types
const AdminDash = ({token}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    sessionStorage.removeItem('token')
    // For example, clear tokens or user session
    navigate('/adminlogin'); // Redirect to login page after logout
  };

  const [activeSection, setActiveSection] = useState('update-crypto');

  const renderSection = () => {
    switch (activeSection) {
      case 'update-crypto':
        return <UpdateCrypto />;
      case 'view-crypto':
        return <ViewCrypto />;
      case 'add-crypto':
        return <AddCrypto />;
      case 'delete-crypto':
        return <DeleteCrypto />;
      default:
        return <UpdateCrypto />;
    }
  };

  return (
    <div>
      <header>
        <nav style={{ position: 'absolute', width: '100%' }}>
          <div className="navbar">
            <h1>ADMIN DASHBOARD</h1>
            <div className="nav-links">
              <a href="#update-crypto" onClick={() => setActiveSection('update-crypto')}>Update Crypto</a>
              <a href="#view-crypto" onClick={() => setActiveSection('view-crypto')}>View Crypto</a>
              <a href="#add-crypto" onClick={() => setActiveSection('add-crypto')}>Add Crypto</a>
              <a href="#delete-crypto" onClick={() => setActiveSection('delete-crypto')}>Delete Crypto</a>
              <button id="#logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
      <div className="container" style={{ position:'absolute',transform:'translate(-50%,-50%)', top:'30%',left:'50%',display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10% 0' }}>
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDash;
