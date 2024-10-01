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
    <div className="transactions-card transactions-premium-card">
      {loading && <LoadingOverlay />}
      <div className="transactions-card-header">
        <h2 className="transactions-title">Recent Transactions</h2>
      </div>
      <div className="transactions-card-body">
        <div className="transactions-chip"></div>
        <button onClick={handleNavigate} className="transactions-view-button">View</button>
      </div>
    </div>
  );
};

TransactionsSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TransactionsSection;