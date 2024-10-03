/* eslint-disable no-unused-vars */  
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/userstyles/navbar.css'; 

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav className="user-nav">
      <ul className="user-nav-list">
        <li className="user-nav-item" onClick={() => setActiveComponent('WalletSection')}>Wallet</li>
        <li className="user-nav-item" onClick={() => setActiveComponent('SearchSection')}>Search</li>
        <li className="user-nav-item" onClick={() => setActiveComponent('BuySellSection')}>Buy/Sell</li>
        <li className="user-nav-item" onClick={() => setActiveComponent('TransactionsSection')}>Transactions</li>
        <li className="user-nav-item" onClick={() => setActiveComponent('WatchlistSection')}>Watchlist</li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};

export default Navbar;