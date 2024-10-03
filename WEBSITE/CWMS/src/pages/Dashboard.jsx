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
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/user_components/Card';
import '../styles/userstyles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user || {}; // Safely access user details
  const id = user.id;
  const [userData, setUserData] = useState('');
  const [wallet, setWallet] = useState(user.wallet || ''); // Initialize with passed wallet
  const [activeComponent, setActiveComponent] = useState('Card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
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
            const initialBalance = 10000;
          
            const createWallet = async () => {
              try {
                const { error } = await supabase
                  .from('wallet')
                  .insert({
                    walletid: walletId,
                    userid: user.id, // Assuming you have the user ID available
                    balance: initialBalance,
                    cryptoid: [],
                    quantity: []
                  });
          
                if (error) {
                  throw error;
                }
          
                console.log("New wallet created successfully!");
              } catch (error) {
                console.error("Error creating wallet:", error.message);
              }
            };
          
            createWallet();
          }
        } catch (error) {
          console.log(error.message);
          
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, user.id]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      sessionStorage.removeItem('token');
      navigate('/login');
    }, 1000);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'WalletSection':
        return <WalletSection user={user} wallet={wallet}/>;
      case 'SearchSection':
        return <SearchSection user={user}  />;
      case 'BuySellSection':
        return <BuySellSection user={user} />;
      case 'TransactionsSection':
        return <TransactionsSection user={user} />;
      case 'WatchlistSection':
        return <WatchlistSection user={user} />;
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
          <nav className='user-nav'>
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
              <LoadingSpinner />
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