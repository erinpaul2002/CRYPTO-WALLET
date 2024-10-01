import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/CryptoTable.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;

  const fetchData = async () => {
    const { data, error } = await supabase.from('cryptocurrency').select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCryptoData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='tablebody'>
      <button className="back-button" onClick={() => navigate('/dashboard', { state: { user } })}>Back to Dashboard</button>
      <div className="container">
        <h1 className="title">Crypto Table</h1>
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Crypto Name</th>
              <th>Crypto Price</th>
              <th>Supply</th>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={index}>
                <td>{crypto.cryptoname}</td>
                <td>{crypto.cryptoprice}</td>
                <td>{crypto.supply}</td>
                <td>{crypto.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;