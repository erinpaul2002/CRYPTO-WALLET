/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/deletecrypto.css';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

const DeleteCrypto = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const { data, error } = await supabase.from('cryptocurrency').select();
        if (error) {
          throw error;
        }
        setCryptocurrencies(data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error.message);
      }
    };

    fetchCryptocurrencies();
  }, []);

  const handleDeleteCrypto = async () => {
    try {
      if (!selectedCrypto) {
        setStatus({ success: false, message: 'Please select a cryptocurrency to delete.' });
        return;
      }

      const { data, error } = await supabase
        .from('cryptocurrency')
        .delete()
        .eq('cryptoname', selectedCrypto);

      if (error) {
        throw error;
      }

      setStatus({ success: true, message: 'Cryptocurrency deleted successfully' });
      console.log('Cryptocurrency deleted:', data);
      // Refresh the list of cryptocurrencies after deletion
      setCryptocurrencies((prevCryptos) => prevCryptos.filter((crypto) => crypto.cryptoname !== selectedCrypto));
      setSelectedCrypto('');
    } catch (error) {
      setStatus({ success: false, message: `Error deleting cryptocurrency: ${error.message}` });
      console.error('Error deleting cryptocurrency:', error.message);
    }
  };

  const handleReset = () => {
    setSelectedCrypto('');
    setStatus(null);
  };

  return (
    <div className={`delete-crypto-container ${status ? (status.success ? 'success' : 'error') : ''}`}>
      {status ? (
        <div className={`status-message ${status.success ? '' : 'error'}`}>
          {status.success ? <FaCheckCircle className="success-icon" /> : <FaTimesCircle className="error-icon" />}
          <span>{status.message}</span>
          <button className="reset-button" onClick={handleReset}>
            <FaTrashAlt style={{ marginRight: '8px' }} />
            Delete Another Cryptocurrency
          </button>
        </div>
      ) : (
        <>
          <h2>Delete Cryptocurrency</h2>
          <div className="delete-crypto-fields">
            <select onChange={(e) => setSelectedCrypto(e.target.value)} value={selectedCrypto}>
              <option value="">Select Cryptocurrency to Delete</option>
              {cryptocurrencies.map((crypto) => (
                <option key={crypto.cryptoname} value={crypto.cryptoname}>
                  {crypto.cryptoname}
                </option>
              ))}
            </select>
            <button onClick={handleDeleteCrypto}>Delete Cryptocurrency</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteCrypto;