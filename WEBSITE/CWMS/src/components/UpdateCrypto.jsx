/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/updatecrypto.css';
import { FaCheckCircle, FaTimesCircle, FaSyncAlt } from 'react-icons/fa';

const CryptoUpdate = () => {
  const [cryptoUpdate, setCryptoUpdate] = useState({
    cryptoid: '',
    cryptoprice: '',
    marketcap: '',
  });

  const [cryptoList, setCryptoList] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchCryptoList() {
      try {
        const { data, error } = await supabase
          .from('cryptocurrency')
          .select('cryptoid, cryptoname, marketcap');

        if (error) {
          throw error;
        }

        setCryptoList(data);
      } catch (error) {
        console.error('Error fetching crypto list:', error.message);
      }
    }

    fetchCryptoList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCryptoUpdate({
      ...cryptoUpdate,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('cryptocurrency')
        .update({
          cryptoprice: cryptoUpdate.cryptoprice,
          marketcap: cryptoUpdate.marketcap,
        })
        .eq('cryptoid', cryptoUpdate.cryptoid)
        .select();

      if (error) {
        throw error;
      }

      setStatus({ success: true, message: 'Cryptocurrency data updated successfully' });
      console.log('Cryptocurrency data updated:', data);
    } catch (error) {
      setStatus({ success: false, message: `Error updating cryptocurrency data: ${error.message}` });
      console.error('Error updating cryptocurrency data:', error.message);
    }
  };

  const handleReset = () => {
    setCryptoUpdate({
      cryptoid: '',
      cryptoprice: '',
      marketcap: '',
    });
    setStatus(null);
  };

  return (
    <div className={`crypto-update-container ${status ? (status.success ? 'success' : 'error') : ''}`}>
      {status ? (
        <div className={`status-message ${status.success ? '' : 'error'}`}>
          {status.success ? <FaCheckCircle className="success-icon" /> : <FaTimesCircle className="error-icon" />}
          <span>{status.message}</span>
          <button className="reset-button" onClick={handleReset}>
            <FaSyncAlt style={{ marginRight: '8px' }} />
            Update Another Cryptocurrency
          </button>
        </div>
      ) : (
        <>
          <h2>Update Cryptocurrency Data</h2>
          <div className="update-fields">
            <select name="cryptoid" onChange={handleChange} value={cryptoUpdate.cryptoid}>
              <option value="">Select a cryptocurrency</option>
              {cryptoList.map((crypto) => (
                <option key={crypto.cryptoid} value={crypto.cryptoid}>
                  {crypto.cryptoname}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="cryptoprice"
              value={cryptoUpdate.cryptoprice}
              onChange={handleChange}
              placeholder="Enter Cryptoprice"
            />
            <input
              type="text"
              name="marketcap"
              value={cryptoUpdate.marketcap}
              onChange={handleChange}
              placeholder="Enter Market Cap"
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoUpdate;