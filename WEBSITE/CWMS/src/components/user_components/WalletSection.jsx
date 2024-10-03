import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/walletsection.css';

const WalletSection = ({ user, wallet }) => {
  const navigate = useNavigate();

  return (
    <div className="user-wallet-card user-wallet-premium-card">
      <div className="user-wallet-card-header">
        <h2 className="user-wallet-title">Wallet</h2>
      </div>
      <div className="user-wallet-card-body">
        {wallet ? (
          <>
            <div className="user-wallet-card-info">
              <p className="user-wallet-id"><strong>Address:</strong> {wallet.walletid}</p>
              <p className="user-wallet-balance"><strong>Balance:</strong> {wallet.balance}</p>
            </div>
            <div className="user-wallet-chip"></div>
          </>
        ) : ""}
        <button onClick={() => navigate('/wallet', { state: { user, wallet } })} className="user-wallet-button">View</button>
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