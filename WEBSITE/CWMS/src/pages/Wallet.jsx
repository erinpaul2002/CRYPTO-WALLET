import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/wallet.css";

function Wallet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user,wallet } = location.state || {};
  const walletId = wallet.walletid;
  console.log(wallet, user);

  const [cryptoDetails, setCryptoDetails] = useState([]);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const { data: walletData, error: walletError } = await supabase
          .from("wallet")
          .select("cryptoid")
          .eq("walletid", walletId);

        if (walletError) {
          throw walletError;
        }

        const cryptoIdList = walletData[0]?.cryptoid;

        if (cryptoIdList && cryptoIdList.length > 0) {
          const { data: cryptoData, error: cryptoError } = await supabase
            .from("cryptocurrency")
            .select("cryptoname")
            .in("cryptoid", cryptoIdList);

          if (cryptoError) {
            throw cryptoError;
          }

          setCryptoDetails(cryptoData);
        }
      } catch (error) {
        console.error('Error fetching wallet or cryptocurrency details:', error.message);
      }
    };

    if (walletId) {
      fetchCryptoDetails();
    }
  }, [walletId]);

  const handleBackToDashboard = () => {
    navigate('/dashboard', { state: { user,wallet } });
  };

  return (
    <div>
      <div className='bodyy'>
        <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
        <section className="wallet1">
          <h2>Your Wallet</h2>
          <div className="wallet-info">
            {/* Display other wallet information here */}
          </div>
          <div className="wallet1-actions">
            {/* Add wallet action links here */}
          </div>
          <br></br>

          {cryptoDetails.map((crypto, index) => (
            <div key={index} className="crypto-balance">
              <p><strong>Cryptoname:</strong> {crypto.cryptoname}::<strong>Quantity:</strong> {wallet.quantity[index]}</p>
             
            </div>
          ))}
          <p>Total balance: {wallet.balance}</p>
        </section>
      </div>
    </div>
  );
}

export default Wallet;