import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/viewcrypto.css';

const ViewCrypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const { data, error } = await supabase
          .from('cryptocurrency')
          .select('symbol, cryptoname, cryptoprice, supply');

        if (error) {
          throw error;
        }

        setCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
      }
    };

    fetchCryptos();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  const filteredCryptos = selectedCrypto
    ? cryptos.filter((crypto) => crypto.symbol === selectedCrypto)
    : [];

  return (
    <div className="crypto-container">
      <h2>View Cryptos Available</h2>
      <div className="search-container">
        <select
          value={selectedCrypto}
          onChange={handleSelectChange}
          className="search-select"
        >
          <option value="">Select a cryptocurrency</option>
          {cryptos.map((crypto) => (
            <option key={crypto.symbol} value={crypto.symbol}>
              {crypto.cryptoname} ({crypto.symbol})
            </option>
          ))}
        </select>
      </div>
      {filteredCryptos.length > 0 && (
        <div className="crypto-grid">
          {filteredCryptos.map((crypto, index) => (
            <div key={index} className="crypto-card">
              <p className="crypto-name">Name: {crypto.cryptoname}</p>
              <p className="crypto-symbol">Symbol: {crypto.symbol}</p>
              <p className="crypto-price">Price: ${crypto.cryptoprice}</p>
              <p className="crypto-supply">Supply: {crypto.supply}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCrypto;