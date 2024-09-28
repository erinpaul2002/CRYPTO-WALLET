import  { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/viewcrypto.css';

const ViewCrypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');

  const handleSearch = async () => {
    if (!searchSymbol.trim()) {
      setCryptos([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cryptocurrency')
        .select('symbol, cryptoname, cryptoprice, marketcap')
        .or(`symbol.ilike.%${searchSymbol}%,cryptoname.ilike.%${searchSymbol}%`);

      if (error) {
        throw error;
      }

      if (data) {
        setCryptos(data);
      }
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error.message);
    }
  };

  return (
    <div className="crypto-container">
      <h2>Cryptos Available</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          placeholder="Search by symbol"
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {cryptos.length > 0 && (
        <div className="crypto-grid">
          {cryptos.map((crypto, index) => (
            <div key={index} className="crypto-card">
              <p className="crypto-name">Name: {crypto.cryptoname}</p>
              <p className="crypto-symbol">Symbol: {crypto.symbol}</p>
              <p className="crypto-price">Price: ${crypto.cryptoprice}</p>
              <p className="crypto-marketcap">MarketCap: {crypto.marketcap}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCrypto;