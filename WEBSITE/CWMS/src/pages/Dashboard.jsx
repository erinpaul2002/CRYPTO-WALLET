/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import WalletSection from '../components/user_components/WalletSection';
import SearchSection from '../components/user_components/SearchSection';
import BuySellSection from '../components/user_components/BuySellSection';
import TransactionsSection from '../components/user_components/TransactionsSection';
import WatchlistSection from '../components/user_components/WatchlistSection';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component
import Card from '../components/user_components/Card'; // Import the Card component
import '../styles/userstyles/dashboard.css'


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.user.id;
  const [userData, setUserData] = useState('');
  const [wallet, setWallet] = useState('');
  const [activeComponent, setActiveComponent] = useState('Card'); // Set initial component to Card
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true); // Set loading to true before API call
        try {
          const { data: userData, error: userError } = await supabase
            .from('user')
            .select()
            .eq('userid', id)
            .single();

          const { data: walletData, error: walletError } = await supabase
            .from('wallet')
            .select()
            .eq('userid', id)
            .single();

          if (userError) {
            throw userError;
          }
          setWallet(walletData);
          setUserData(userData);

          if (!walletData || walletData.length === 0) {
            const walletId = uuidv4();
          }
          if (walletError) {
            throw walletError;
          }
        } catch (error) {
          console.log(error.message);
          window.location.reload();
        } finally {
          setLoading(false); // Set loading to false after API call
        }
      }
    };

    fetchData();
  }, [id]);

  const handleLogout = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      // Perform logout logic here
      sessionStorage.removeItem('token');
      // For example, clear tokens or user session
      navigate('/login'); // Redirect to login page after logout
    }, 1000); // 1 second delay
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'WalletSection':
        return <WalletSection wallet={wallet} />;
      case 'SearchSection':
        return <SearchSection />;
      case 'BuySellSection':
        return <BuySellSection wallet={wallet} />;
      case 'TransactionsSection':
        return <TransactionsSection id={id} />;
      case 'WatchlistSection':
        return <WatchlistSection id={id} />;
      case 'Card':
      default:
        return <Card firstname={userData?.firstname} walletid={wallet.walletid} />;
    }
  };

  return (
    <div>
      <header className="header1" style={{ position: 'fixed', width: '100%' }}>
        <div className="logo">
          <h1>Crypto X</h1>
          <nav>
      <ul>
        <li onClick={() => setActiveComponent('WalletSection')}>Wallet</li>
        <li onClick={() => setActiveComponent('SearchSection')}>Search</li>
        <li onClick={() => setActiveComponent('BuySellSection')}>Buy/Sell</li>
        <li onClick={() => setActiveComponent('TransactionsSection')}>Transactions</li>
        <li onClick={() => setActiveComponent('WatchlistSection')}>Watchlist</li>
      </ul>
    </nav>
        </div>
      </header>
      {id ? (
        <div className="container10">
          <div id="hero" className="hero">
            {loading ? (
              <LoadingSpinner /> // Conditionally render the loading spinner
            ) : (
              renderActiveComponent()
            )}
          </div>
          <footer className="footer">
            <p>CryptoX</p>
            <button className='logout-btn' id="#logout" onClick={handleLogout}>Logout</button>
          </footer>
        </div>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default Dashboard;