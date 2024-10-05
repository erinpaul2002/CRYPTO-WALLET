/* eslint-disable no-unused-vars */
//admin dash
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminstyles/admindash.css';
import ViewCrypto from '../components/admin_components/ViewCrypto';
import UpdateCrypto from '../components/admin_components/UpdateCrypto';
import AddCrypto from '../components/admin_components/AddCrypto';
import DeleteCrypto from '../components/admin_components/DeleteCrypto';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component

// eslint-disable-next-line react/prop-types
const AdminDash = ({ token }) => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('add');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogout = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      // Perform logout logic here
      sessionStorage.removeItem('token');
      // For example, clear tokens or user session
      navigate('/adminlogin'); // Redirect to login page after logout
    }, 1000); // 1 second delay
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
    <div className='admin-dash'>
      <header>
        <nav className='admin-dash-nav'>
          <div className="admin-dash-navbar">
            <h1>ADMIN DASHBOARD</h1>
            <div className="admin-dash-nav-links">
              <a onClick={() => setActiveComponent('add')}>Add Crypto</a>
              <a onClick={() => setActiveComponent('view')}>View Crypto</a>
              <a onClick={() => setActiveComponent('update')}>Update Crypto</a>
              <a onClick={() => setActiveComponent('delete')}>Delete Crypto</a>
              <button id="admin-dash-logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
      <div className="admin-dash-container" >
        {loading ? (
          <LoadingSpinner /> // Conditionally render the loading spinner
        ) : (
          renderComponent()
        )}
      </div>
    </div>
  );
};

export default AdminDash;