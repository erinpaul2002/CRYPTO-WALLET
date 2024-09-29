
import { useNavigate } from 'react-router-dom';
import '../../styles/userstyles/searchsection.css'

const SearchSection = () => {
  const navigate = useNavigate();
  return (
  <div className="card premium-card">
  <div className="card-header">
    <h2 className="view-title">View Crypto</h2>
  </div>
  <div className="card-body">
        <div className="wallet-chip"></div>
    <button onClick={() => navigate('/searchcrypto')} className="view-button">View</button>
  </div>
</div>);




  
  };

export default SearchSection;