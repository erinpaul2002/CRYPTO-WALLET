import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/buysellsection.css';

const BuySellSection = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="user-buysell-card user-buysell-premium-card">
      <div className="user-buysell-card-header">
        <h2 className="user-buysell-title">Buy/Sell Cryptocurrencies</h2>
      </div>
      <div className="user-buysell-card-body">
        <div className="user-buysell-card-info">
          <p className="user-buysell-info">Manage your cryptocurrency transactions here.</p>
        </div>
        <button onClick={() => navigate('/buysell', { state: { user } })} className="user-buysell-button">View</button>
      </div>
    </div>
  );
};

BuySellSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BuySellSection;