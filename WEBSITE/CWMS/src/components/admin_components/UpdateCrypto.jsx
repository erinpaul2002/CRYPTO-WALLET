/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import '../styles/updatecrypto.css';
import { FaCheckCircle, FaTimesCircle, FaSyncAlt } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component

const CryptoUpdate = () => {
  const [cryptoUpdate, setCryptoUpdate] = useState({
    cryptoid: '',
    cryptoprice: '',
    supply: '',
  });

  const [cryptoList, setCryptoList] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    async function fetchCryptoList() {
      setLoading(true); // Set loading to true before API call
      try {
        const { data, error } = await supabase
          .from('cryptocurrency')
          .select('cryptoid, cryptoname, supply');

        if (error) {
          throw error;
        }

        setCryptoList(data);
      } catch (error) {
        console.error('Error fetching crypto list:', error.message);
      } finally {
        setLoading(false); // Set loading to false after API call
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
    setLoading(true); // Set loading to true before API call
    try {
      // Fetch the current values from the database
      const { data: currentData, error: fetchError } = await supabase
        .from('cryptocurrency')
        .select('cryptoprice, supply')
        .eq('cryptoid', cryptoUpdate.cryptoid)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Prepare the update object with new values or retain old values
      const updateData = {
        cryptoprice: cryptoUpdate.cryptoprice || currentData.cryptoprice,
        supply: cryptoUpdate.supply || currentData.supply,
      };

      const { data, error } = await supabase
        .from('cryptocurrency')
        .update(updateData)
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
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleReset = () => {
    setCryptoUpdate({
      cryptoid: '',
      cryptoprice: '',
      supply: '',
    });
    setStatus(null);
  };

  return (
    <div className={`crypto-update-container ${status ? (status.success ? 'success' : 'error') : ''}`}>
      {loading ? (
        <LoadingSpinner /> // Conditionally render the loading spinner
      ) : status ? (
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
              name="supply"
              value={cryptoUpdate.supply}
              onChange={handleChange}
              placeholder="Enter Market Supply"
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoUpdate;