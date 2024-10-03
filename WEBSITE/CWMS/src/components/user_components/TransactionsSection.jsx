import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from '../LoadingOverlay'; // Import LoadingOverlay
import '../../styles/userstyles/transactionsection.css';

const TransactionsSection = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/transactions', { state: { user } });
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="user-transactions-card user-transactions-premium-card">
      {loading && <LoadingOverlay />}
      <div className="user-transactions-card-header">
        <h2 className="user-transactions-title">Recent Transactions</h2>
      </div>
      <div className="user-transactions-card-body">
        <div className="user-transactions-chip"></div>
        <button onClick={handleNavigate} className="user-transactions-view-button">View</button>
      </div>
    </div>
  );
};

TransactionsSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TransactionsSection;