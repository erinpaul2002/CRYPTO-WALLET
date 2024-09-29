
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/transactionsection.css'

const TransactionsSection = ({ id }) => {
  const navigate = useNavigate();

  return (
    <section className="transactions">
      <div className="card">
        <h2>Recent Transactions</h2>
        <button onClick={() => navigate('/transactions', { state: id })}>View</button>
      </div>
    </section>
  );
};

TransactionsSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TransactionsSection;