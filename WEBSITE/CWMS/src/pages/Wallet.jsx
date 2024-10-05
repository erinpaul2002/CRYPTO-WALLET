import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/wallet.css";

function Wallet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, wallet } = location.state || {};
  const walletId = wallet.walletid;
  console.log(wallet, user);

  const [cryptoDetails, setCryptoDetails] = useState([]);
  const [addAmount, setAddAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

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
    navigate('/dashboard', { state: { user, wallet } });
  };

  const handleAddMoney = async () => {
    const newBalance = wallet.balance + parseFloat(addAmount);
    const { error } = await supabase
      .from('wallet')
      .update({ balance: newBalance })
      .eq('walletid', walletId);

    if (error) {
      console.error('Error adding money:', error.message);
    } else {
      wallet.balance = newBalance;
      setAddAmount(0);
    }
  };

  const handleWithdrawMoney = async () => {
    if (withdrawAmount > wallet.balance) {
      console.error('Insufficient balance');
      return;
    }

    const newBalance = wallet.balance - parseFloat(withdrawAmount);
    const { error } = await supabase
      .from('wallet')
      .update({ balance: newBalance })
      .eq('walletid', walletId);

    if (error) {
      console.error('Error withdrawing money:', error.message);
    } else {
      wallet.balance = newBalance;
      setWithdrawAmount(0);
    }
  };

  return (
    <div>
      <div className='bodyy-user'>
        <button onClick={handleBackToDashboard} className="back-button-user">Back to Dashboard</button>
        <section className="wallet1-user">
          <h2>Your Wallet</h2>
          <br></br>
          <p>Total balance: {wallet.balance}</p>          
          <br></br>
          <div className="wallet-info-user">
            <div className="crypto-balance-container">
              {cryptoDetails.map((crypto, index) => (
                <div key={index} className="crypto-balance-user">
                  <p>
                    <strong>Cryptoname:</strong> {crypto.cryptoname}::<strong>Quantity:</strong> {wallet.quantity[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <br></br>
          <div className="wallet1-actions-user">
            {/* Add wallet action links here */}
            <div className="wallet-actions">
            <div>
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="Amount to add"
              />
              <button onClick={handleAddMoney}>Add Money</button>
            </div>
            <div>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount to withdraw"
              />
              <button onClick={handleWithdrawMoney}>Withdraw Money</button>
            </div>
          </div>
          </div>
        
          
        </section>
      </div>
    </div>
  );
}

export default Wallet;