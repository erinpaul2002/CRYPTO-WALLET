
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/watchlistsection.css'

const WatchlistSection = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="card premium-card">
    <div className="card-header">
      <h2 className="watchlist-title">WatchList</h2>
    </div>
    <div className="card-body">
          <div className="wallet-chip"></div>
      <button onClick={() => navigate('/watchlist',{state:id})} className="watchlist-button">View</button>
    </div>
  </div>);
};
WatchlistSection.propTypes = {
  id: PropTypes.string.isRequired,
};


export default WatchlistSection;