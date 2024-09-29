/* eslint-disable no-unused-vars */  
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/userstyles/card.css'; // Assuming you have a separate CSS file for Card styles

const Card = ({ firstname, walletid, children }) => (
  <div className="card premium-card">
    <div className="card-header">
      <h2 className="card-title">Premium Card</h2>
    </div>
    <div className="card-body">
      {firstname && walletid ? (
        <>
          <div className="card-info">
            <p className="card-name">{firstname}</p>
            <p className="card-walletid"></p>
          </div>
          <div className="card-chip"></div>
        </>
      ) : (
        children
      )}
      <button className="card-button">Click Me</button>
    </div>
  </div>
);

Card.propTypes = {
  firstname: PropTypes.string,
  walletid: PropTypes.string,
  children: PropTypes.node,
};

export default Card;