
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/walletsection.css'

const WalletSection = ({ wallet }) => {
  const navigate = useNavigate();

  return (
    <section className="wallet">
      <div className="card">
        <h2>Wallet</h2>
        <div className="wallet-info">
          <p>
            <strong>Balance:</strong> {wallet.balance}
          </p>
          <p>
            <strong>Address:</strong> {wallet.walletid}
          </p>
        </div>
        <br />
        <button onClick={() => navigate('/wallet', { state: wallet })}>View</button>
      </div>
    </section>
  );
};

WalletSection.propTypes = {
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    walletid: PropTypes.string.isRequired,
  }).isRequired,
};

export default WalletSection;