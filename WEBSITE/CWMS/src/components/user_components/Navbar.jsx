/* eslint-disable no-unused-vars */  
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/userstyles/navbar.css'; 

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav>
      <ul>
        <li onClick={() => setActiveComponent('WalletSection')}>Wallet</li>
        <li onClick={() => setActiveComponent('SearchSection')}>Search</li>
        <li onClick={() => setActiveComponent('BuySellSection')}>Buy/Sell</li>
        <li onClick={() => setActiveComponent('TransactionsSection')}>Transactions</li>
        <li onClick={() => setActiveComponent('WatchlistSection')}>Watchlist</li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};

export default Navbar;