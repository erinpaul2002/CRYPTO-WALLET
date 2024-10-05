/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../styles/buysell.css";

function CryptoBuySell() {
  const [wallet, setWallet] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const uid = user.id;

  const [action, setAction] = useState("");
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [cryptoHoldings, setCryptoHoldings] = useState([]);
  const [cryptoBal, setCryptoBal] = useState([]);
  const [actualCryptoBal, setActualCryptoBal] = useState([]);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const { data, error } = await supabase.from("cryptocurrency").select();
        if (error) {
          throw error;
        }
        setCryptocurrencies(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCryptocurrencies();
  }, []);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data, error } = await supabase
          .from("wallet")
          .select()
          .eq("userid", uid)
          .single();
        if (error) {
          throw error;
        }
        setWallet(data);
        setCryptoHoldings(data.cryptoid || []);
        setCryptoBal(data.quantity || []);
        setActualCryptoBal(data.quantity || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWallet();
  }, [action, amount, uid]);

  useEffect(() => {
    const fetchPricesAndCalculateBalance = async () => {
      try {
        const { data: prices, error } = await supabase
          .from("cryptocurrency")
          .select()
          .in("cryptoid", cryptoHoldings);

        if (error) {
          throw error;
        }

        const newTotalBalance = prices.reduce((acc, { cryptoid, cryptoprice }) => {
          const index = cryptoHoldings.indexOf(cryptoid);
          if (index !== -1) {
            const balance = cryptoBal[index];
            return acc + (cryptoprice * balance);
          }
          return acc;
        }, 0);

        setTotalBalance(newTotalBalance);
      } catch (error) {
        console.error("Error fetching prices and calculating balance:", error.message);
      }
    };

    fetchPricesAndCalculateBalance();
  }, [cryptoHoldings, cryptoBal, action]);

  const handleCryptoChange = (event) => {
    setCrypto(event.target.value);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleBuySell();
  };

  const getCryptoPrice = async (cryptoId) => {
    try {
      const { data, error } = await supabase
        .from("cryptocurrency")
        .select("cryptoprice")
        .eq("cryptoid", cryptoId)
        .single();
  
      if (error) {
        throw error;
      }
  
      return data ? data.cryptoprice : 0;
    } catch (error) {
      console.error("Error fetching cryptocurrency price:", error.message);
      return 0;
    }
  };

  const handleBuySell = async () => {
    if (!crypto || !action || !amount) {
      setNotification({ message: "Please fill in all details", type: "error" });
      return;
    }
  
    const index = cryptoHoldings.indexOf(crypto);
  
    if (action === "sell") {
      if (index !== -1) {
        const bal = cryptoBal[index];
        if (bal >= amount) {
          const updatedCryptoBal = [...cryptoBal];
          updatedCryptoBal[index] = bal - parseInt(amount);
  
          const updatedActualCryptoBal = [...actualCryptoBal];
          updatedActualCryptoBal[index] = bal - parseInt(amount);
  
          if (updatedActualCryptoBal[index] === 0) {
            updatedCryptoBal.splice(index, 1);
            updatedActualCryptoBal.splice(index, 1);
            const updatedCryptoHoldings = [...cryptoHoldings];
            updatedCryptoHoldings.splice(index, 1);
            setCryptoHoldings(updatedCryptoHoldings);

            try {
              await supabase
                .from("wallet")
                .update({
                  quantity: updatedActualCryptoBal,
                  cryptoid: updatedCryptoHoldings,
                })
                .eq("walletid", wallet.walletid);
            } catch (error) {
              setNotification({ message: "Error updating wallet: " + error.message, type: "error" });
              return;
            }
          }
  
          setCryptoBal(updatedCryptoBal);
          setActualCryptoBal(updatedActualCryptoBal);
  
          try {
            const cryptoPrice = await getCryptoPrice(crypto);
            const totalCost = cryptoPrice * parseInt(amount);
  
            await supabase
              .from("wallet")
              .update({
                quantity: updatedActualCryptoBal,
                balance: wallet.balance + totalCost,
              })
              .eq("walletid", wallet.walletid);
  
            const tId = uuidv4();
            await supabase.from("transaction").insert({
              transactionid: tId,
              timestamp: new Date().toISOString(),
              amount: amount,
              walletid: user.walletid,
              userid: uid,
            });
  
            const { data: updatedWallet, error: walletError } = await supabase
              .from("wallet")
              .select()
              .eq("walletid", wallet.walletid)
              .single();
  
            if (walletError) {
              throw walletError;
            }
  
            setWallet(updatedWallet);
            setNotification({ message: "Sell operation completed successfully!", type: "success" });
          } catch (error) {
            setNotification({ message: "Error updating wallet or inserting transaction: " + error.message, type: "error" });
          }
        } else {
          setNotification({ message: "Not enough crypto to sell the given amount!", type: "error" });
        }
      } else {
        setNotification({ message: "The mentioned crypto is not in your holdings!", type: "error" });
      }
    } else if (action === "buy") {
      const selectedCrypto = cryptocurrencies.find((c) => c.cryptoid === crypto);
  
      if (selectedCrypto) {
        const cryptoPrice = selectedCrypto.cryptoprice;
        const totalCost = cryptoPrice * parseInt(amount);
  
        if (wallet.balance >= totalCost) {
          if (index !== -1) {
            const bal = cryptoBal[index];
            const updatedCryptoBal = [...cryptoBal];
            updatedCryptoBal[index] = bal + parseInt(amount);
            setCryptoBal(updatedCryptoBal);
  
            const updatedActualCryptoBal = [...cryptoBal];
            updatedActualCryptoBal[index] = bal + parseInt(amount);
            setTotalBalance(calculateTotalBalance(updatedActualCryptoBal));
  
            try {
              await supabase
                .from("wallet")
                .update({
                  quantity: updatedActualCryptoBal,
                  balance: wallet.balance - totalCost
                })
                .eq("walletid", wallet.walletid);
  
              const tId = uuidv4();
              await supabase.from("transaction").insert({
                transactionid: tId,
                timestamp: new Date().toISOString(),
                amount: amount,
                walletid: user.walletid,
                userid: uid
              });
  
              setNotification({ message: "Buy operation completed successfully!", type: "success" });
            } catch (error) {
              setNotification({ message: "Error updating wallet or inserting transaction: " + error.message, type: "error" });
            }
          } else {
            const updatedCryptoHoldings = [...cryptoHoldings, crypto];
            const updatedCryptoBal = [...cryptoBal, parseInt(amount)];
            setCryptoHoldings(updatedCryptoHoldings);
            setCryptoBal(updatedCryptoBal);

            try {
              await supabase
                .from("wallet")
                .update({
                  quantity: updatedCryptoBal,
                  cryptoid: updatedCryptoHoldings,
                  balance: wallet.balance - totalCost
                })
                .eq("walletid", wallet.walletid);

              const tId = uuidv4();
              await supabase.from("transaction").insert({
                transactionid: tId,
                timestamp: new Date().toISOString(),
                amount: amount,
                walletid: user.walletid,
                userid: uid
              });

              setNotification({ message: "Buy operation completed successfully!", type: "success" });
            } catch (error) {
              setNotification({ message: "Error updating wallet or inserting transaction: " + error.message, type: "error" });
            }
          }
        } else {
          setNotification({ message: "Not enough balance to make the purchase!", type: "error" });
        }
      } else {
        setNotification({ message: "Selected cryptocurrency not found!", type: "error" });
      }
    }
  };

  const calculateTotalBalance = (updatedActualCryptoBal) => {
    const newTotalBalance = cryptocurrencies.reduce((acc, { cryptoid, cryptoprice }) => {
      const index = cryptoHoldings.indexOf(cryptoid);
      if (index !== -1) {
        const balance = updatedActualCryptoBal[index];
        return acc + (cryptoprice * balance);
      }
      return acc;
    }, 0);

    return newTotalBalance;
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard', { state: { user } });
  };

  return (
    <div className="page1-user">
      <button onClick={handleBackToDashboard} className="back-button-user">Back to Dashboard</button>
      <h1>Buy-Sell Cryptocurrencies</h1>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <section className="buysell-user">
        <div className="buysell-list-user">
          <div className="crypto1-user">
            <form onSubmit={handleSubmit}>
              <select value={crypto} onChange={handleCryptoChange}>
                <option value="">Select a cryptocurrency</option>
                {cryptocurrencies.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.cryptoid}>
                    {crypto.symbol}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter the amount"
              />

              <div className="custom-select-user">
                <select value={action} onChange={handleActionChange}>
                  <option value="">Select an action</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CryptoBuySell;