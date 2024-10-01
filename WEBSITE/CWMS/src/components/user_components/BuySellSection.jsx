import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/buysellsection.css';

const BuySellSection = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="buysell-card buysell-premium-card">
      <div className="buysell-card-header">
        <h2 className="buysell-title">Buy/Sell Cryptocurrencies</h2>
      </div>
      <div className="buysell-card-body">
        <div className="buysell-card-info">
          <p className="buysell-info">Manage your cryptocurrency transactions here.</p>
        </div>
        <button onClick={() => navigate('/buysell', { state: { user } })} className="buysell-button">View</button>
      </div>
    </div>
  );
};

BuySellSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BuySellSection;