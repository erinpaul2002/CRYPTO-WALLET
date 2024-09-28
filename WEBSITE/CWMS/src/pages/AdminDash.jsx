/* eslint-disable no-unused-vars */
//admin dash
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admindash.css';
import ViewCrypto from '../components/ViewCrypto';
import UpdateCrypto from '../components/UpdateCrypto';
import AddCrypto from '../components/AddCrypto';
import DeleteCrypto from '../components/DeleteCrypto';

// eslint-disable-next-line react/prop-types
const AdminDash = ({ token }) => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('update');

  const handleLogout = () => {
    // Perform logout logic here
    sessionStorage.removeItem('token');
    // For example, clear tokens or user session
    navigate('/adminlogin'); // Redirect to login page after logout
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'update':
        return <UpdateCrypto />;
      case 'view':
        return <ViewCrypto />;
      case 'add':
        return <AddCrypto />;
      case 'delete':
        return <DeleteCrypto />;
      default:
        return <UpdateCrypto />;
    }
  };

  return (
    <div>
      <header>
        <nav>
          <div className="navbar">
            <h1>ADMIN DASHBOARD</h1>
            <div className="nav-links">
              
              
              <a  onClick={() => setActiveComponent('add')}>Add Crypto</a>
              <a  onClick={() => setActiveComponent('view')}>View Crypto</a>
              <a  onClick={() => setActiveComponent('update')}>Update Crypto</a>
              <a  onClick={() => setActiveComponent('delete')}>Delete Crypto</a>
              <button id="#logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10% 0 0 0' }}>
        {renderComponent()} 
      </div>
    </div>
  );
};

export default AdminDash;
