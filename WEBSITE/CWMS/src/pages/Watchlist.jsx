import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import '../styles/watchlist.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const id = user.id;
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [cID, setCID] = useState([]);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const { data: watchlistData, error: watchlistError } = await supabase
          .from('watchlist')
          .select('cryptoid')
          .eq('userid', id);

        if (watchlistError) {
          console.error('Error fetching watchlist data:', watchlistError.message);
          return;
        }

        const watch = watchlistData[0]?.cryptoid || [];
        setWatchlist(watch);

        if (watch.length > 0) {
          const { data, error } = await supabase
            .from('cryptocurrency')
            .select()
            .in('cryptoid', watch);

          if (error) {
            throw error;
          }

          setCID(data);
        }
      } catch (error) {
        console.error('Error in fetchWatchlistData:', error.message);
      }
    };

    fetchWatchlistData();
  }, [id]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const { data: cryptocurrency, error } = await supabase
          .from('cryptocurrency')
          .select('cryptoid, cryptoname, cryptoprice, symbol');

        if (error) {
          throw error;
        }

        setCryptos(cryptocurrency);
      } catch (error) {
        console.error('Error fetching crypto data:', error.message);
      }
    };

    fetchCryptoData();
  }, []);

  const handleAddToWatchlist = async () => {
    const oldWatchlist = [...watchlist, selectedCrypto].filter(Boolean);
    console.log(oldWatchlist);
    try {
      const { data: existingWatchlist, error: fetchError } = await supabase
        .from('watchlist')
        .select('cryptoid')
        .eq('userid', id);

      if (fetchError) {
        throw fetchError;
      }

      if (existingWatchlist.length === 0) {
        const { data, error } = await supabase
          .from('watchlist')
          .insert({ userid: id, cryptoid: oldWatchlist });

        if (error) {
          throw error;
        }

        console.log('Crypto added to watchlist:', data);
      } else {
        const { data, error } = await supabase
          .from('watchlist')
          .update({ cryptoid: oldWatchlist })
          .eq('userid', id);

        if (error) {
          throw error;
        }

        console.log('Crypto added to watchlist:', data);
      }

      const { data: updatedWatchlist, error: updatedError } = await supabase
        .from('watchlist')
        .select('cryptoid')
        .eq('userid', id);

      if (updatedError) {
        throw updatedError;
      }

      setWatchlist(updatedWatchlist[0]?.cryptoid || []);
    } catch (error) {
      console.error('Error adding crypto to watchlist:', error.message);
    }

    try {
      const { data, error } = await supabase
        .from('cryptocurrency')
        .select()
        .in('cryptoid', oldWatchlist);

      if (error) {
        throw error;
      }

      setCID(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching cryptocurrency details:', error.message);
      return null;
    }
  };

  const handleDeleteFromWatchlist = async (cryptoid) => {
    const updatedWatchlist = watchlist.filter((id) => id !== cryptoid);
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .update({ cryptoid: updatedWatchlist })
        .eq('userid', id);

      if (error) {
        throw error;
      }

      console.log('Crypto removed from watchlist:', data);
      setWatchlist(updatedWatchlist);

      const { data: updatedCID, error: updatedCIDError } = await supabase
        .from('cryptocurrency')
        .select()
        .in('cryptoid', updatedWatchlist);

      if (updatedCIDError) {
        throw updatedCIDError;
      }

      setCID(updatedCID);
    } catch (error) {
      console.error('Error removing crypto from watchlist:', error.message);
    }
  };

  return (
    <div className="watchlist-container">
      <button className="back-btn" onClick={() => navigate('/dashboard', { state: { user } })}>Back to Dashboard</button>
      <h2>My Watchlist</h2>
      <div className="add-crypto">
        <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
          <option value="">Select a cryptocurrency</option>
          {cryptos.map((crypto) => (
            <option key={crypto.cryptoid} value={crypto.cryptoid}>
              {crypto.cryptoname} - {crypto.symbol}
            </option>
          ))}
        </select>
        <button className="add-watchlist-btn" onClick={handleAddToWatchlist}>Add to Watchlist</button>
      </div>
      <div className="watchlist-items">
        <h3>Watchlist Items</h3>
        <table>
          <thead>
            <tr>
              <th>Crypto Name</th>
              <th>Symbol</th>
              <th>Crypto Price</th>
            </tr>
          </thead>
          <tbody>
            {cID.map((item) => (
              <tr key={item.cryptoid}>
                <td style={{ color: 'black' }}>{item.cryptoname}</td>
                <td style={{ color: 'black' }}>{item.symbol}</td>
                <td style={{ color: 'black' }}>{item.cryptoprice}</td>
                <td>
                  <button className='delete-btn-user-watchlist' onClick={() => handleDeleteFromWatchlist(item.cryptoid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;