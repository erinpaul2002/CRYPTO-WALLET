/* eslint-disable no-unused-vars */  
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/userstyles/card.css'; // Assuming you have a separate CSS file for Card styles

const Card = ({ firstname, walletid, children }) => (
  <div className="user-card user-premium-card">
    <div className="user-card-header">
      <h2 className="user-card-title">Premium Card</h2>
    </div>
    <div className="user-card-body">
      {firstname && walletid ? (
        <>
          <div className="user-card-info">
            <p className="user-card-name">{firstname}</p>
            <p className="user-card-walletid">Welcome to CryptoX Wallet</p>
          </div>
          <div className="user-card-chip"></div>
        </>
      ) : (
        children
      )}
      {/* <button className="user-card-button">Click Me</button> */}
    </div>
  </div>
);

Card.propTypes = {
  firstname: PropTypes.string,
  walletid: PropTypes.string,
  children: PropTypes.node,
};

export default Card;