
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/walletsection.css'

const WalletSection = ({ wallet }) => {
  const navigate = useNavigate();

  return (<div className="card premium-card">
    <div className="card-header">
      <h2 className="wallet-title">Wallet</h2>
    </div>
    <div className="card-body">
      {wallet ? (
        <>
          <div className="card-info">
            <p className="wallet-id"><strong>Address:</strong> {wallet.walletid}</p>
            <p className="wallet-balance"> <strong>Balance:</strong> {wallet.balance}</p>
          </div>
          <div className="wallet-chip"></div>
        </>
      ):""}
      <button onClick={() => navigate('/wallet', { state: wallet })} className="wallet-button">View</button>
    </div>
  </div>
  );
};

WalletSection.propTypes = {
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    walletid: PropTypes.string.isRequired,
  }).isRequired,
};

export default WalletSection;