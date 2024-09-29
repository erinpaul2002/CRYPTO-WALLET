
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/buysellsection.css'

const BuySellSection = ({ wallet }) => {
  const navigate = useNavigate();

  return (
    <section className="buy-sell">
      <div className="card">
        <h2>Buy/Sell Cryptocurrencies</h2>
        <div className="crypto-list"></div>
        <button onClick={() => navigate('/buysell', { state: wallet })}>View</button>
      </div>
    </section>
  );
};

BuySellSection.propTypes = {
  wallet: PropTypes.object.isRequired,
};

export default BuySellSection;