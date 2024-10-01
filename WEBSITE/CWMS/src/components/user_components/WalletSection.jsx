import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/walletsection.css';

const WalletSection = ({ user, wallet }) => {
  const navigate = useNavigate();

  return (
    <div className="wallet-card wallet-premium-card">
      <div className="wallet-card-header">
        <h2 className="wallet-title">Wallet</h2>
      </div>
      <div className="wallet-card-body">
        {wallet ? (
          <>
            <div className="wallet-card-info">
              <p className="wallet-id"><strong>Address:</strong> {wallet.walletid}</p>
              <p className="wallet-balance"><strong>Balance:</strong> {wallet.balance}</p>
            </div>
            <div className="wallet-chip"></div>
          </>
        ) : ""}
        <button onClick={() => navigate('/wallet', { state: { user, wallet } })} className="wallet-button">View</button>
      </div>
    </div>
  );
};

WalletSection.propTypes = {
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    walletid: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

export default WalletSection;