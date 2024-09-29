/* eslint-disable no-unused-vars */  
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/userstyles/card.css'; // Assuming you have a separate CSS file for Card styles

const Card = ({ firstname, walletid, children }) => (
  <div className="card">
    {firstname && walletid ? (
      <>
        <h2>Welcome {firstname}</h2>
        <p>Cryptocurrency Wallet Is Active.</p>
        <p>Your wallet ID is: {walletid}</p>
      </>
    ) : (
      children
    )}
  </div>
);

Card.propTypes = {
  firstname: PropTypes.string,
  walletid: PropTypes.string,
  children: PropTypes.node,
};

export default Card;