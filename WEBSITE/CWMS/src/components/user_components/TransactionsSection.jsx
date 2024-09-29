
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/transactionsection.css'

const TransactionsSection = ({ id }) => {
  const navigate = useNavigate();

  
    return (
    <div className="card premium-card">
    <div className="card-header">
      <h2 className="transaction-title">Recent Transactions</h2>
    </div>
    <div className="card-body">
          <div className="wallet-chip"></div>
      <button onClick={() => navigate('/transactions',{state:id})} className="view-button">View</button>
    </div>
  </div>);
};

TransactionsSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TransactionsSection;