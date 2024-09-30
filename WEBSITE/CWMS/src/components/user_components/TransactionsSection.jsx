import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from '../LoadingOverlay'; // Import LoadingOverlay
import '../../styles/userstyles/transactionsection.css';

const TransactionsSection = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/transactions', { state: { user: { id } } });
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="card premium-card">
      {loading && <LoadingOverlay />}
      <div className="card-header">
        <h2 className="transaction-title">Recent Transactions</h2>
      </div>
      <div className="card-body">
        <div className="wallet-chip"></div>
        <button onClick={handleNavigate} className="view-button">View</button>
      </div>
    </div>
  );
};

TransactionsSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TransactionsSection;