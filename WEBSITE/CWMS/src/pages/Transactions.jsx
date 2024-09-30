import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import "../styles/transactions.css";

function Transactions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const id = user.id;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("transaction")
          .select()
          .eq("userid", id);

        if (error) {
          throw error;
        }

        setTransactions(data || []);
      } catch (error) {
        console.error("Error fetching transaction data:", error.message);
      }
    };

    fetchTransactions();
  }, [id]);

  const handleBackToDashboard = () => {
    navigate('/dashboard', { state: { user: { id } } });
  };

  return (
    <div className="paget">
      <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
      <section className="transactions">
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.timestamp}>
              <div className="listid">
                <p>Transaction ID: {transaction.transactionid}</p>
                <p>Quantity: {transaction.amount}</p>
                <p>Timestamp: {new Date(transaction.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
        
      </section>
    </div>
  );
}

export default Transactions;