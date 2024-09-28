/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/addcrypto.css';
import { FaCheckCircle, FaTimesCircle, FaPlusCircle } from 'react-icons/fa';

const AddCrypto = () => {
  const [newCrypto, setNewCrypto] = useState({
    cryptoname: '',
    cryptoprice: '',
    marketcap: '',
    symbol: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCrypto({
      ...newCrypto,
      [name]: value
    });
  };

  const handleAddCrypto = async () => {
    try {
      const { data: existingCrypto } = await supabase
        .from('cryptocurrency')
        .select('*')
        .eq('cryptoname', newCrypto.cryptoname);

      if (existingCrypto.length > 0) {
        setStatus({ success: false, message: 'Cryptocurrency already exists' });
        return;
      }

      const { data, error } = await supabase
        .from('cryptocurrency')
        .insert([newCrypto]);

      if (error) {
        throw error;
      }

      setStatus({ success: true, message: 'Cryptocurrency added successfully' });
      console.log('Cryptocurrency added:', data);
    } catch (error) {
      setStatus({ success: false, message: `Error adding cryptocurrency: ${error.message}` });
      console.error('Error adding cryptocurrency:', error.message);
    }
  };

  const handleReset = () => {
    setNewCrypto({
      cryptoname: '',
      cryptoprice: '',
      marketcap: '',
      symbol: '',
    });
    setStatus(null);
  };

  return (
    <div className={`add-crypto-container ${status ? (status.success ? 'success' : 'error') : ''}`}>
      {status ? (
        <div className="status-message">
          {status.success ? <FaCheckCircle className="success-icon" /> : <FaTimesCircle className="error-icon" />}
          <span>{status.message}</span>
          <button className="reset-button" onClick={handleReset}>
            <FaPlusCircle style={{ marginRight: '8px' }} />
            Add Another Cryptocurrency
          </button>
        </div>
      ) : (
        <>
          <h2>Add New Cryptocurrency</h2>
          <div className="add-crypto-fields">
            <input
              type="text"
              name="cryptoname"
              value={newCrypto.cryptoname}
              onChange={handleChange}
              placeholder="Enter Cryptoname"
            />
            <input
              type="text"
              name="cryptoprice"
              value={newCrypto.cryptoprice}
              onChange={handleChange}
              placeholder="Enter Cryptoprice"
            />
            <input
              type="text"
              name="marketcap"
              value={newCrypto.marketcap}
              onChange={handleChange}
              placeholder="Enter Market Cap"
            />
            <input
              type="text"
              name="symbol"
              value={newCrypto.symbol}
              onChange={handleChange}
              placeholder="Enter Symbol"
            />
            <button onClick={handleAddCrypto}>Add Cryptocurrency</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCrypto;