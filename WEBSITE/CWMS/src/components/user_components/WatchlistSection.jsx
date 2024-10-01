import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoadingOverlay from '../LoadingOverlay';
import '../../styles/userstyles/watchlistsection.css';

const WatchlistSection = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/watchlist', { state: { user } });
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="watchlist-card watchlist-premium-card">
      {loading && <LoadingOverlay />}
      <div className="watchlist-card-header">
        <h2 className="watchlist-title">WatchList</h2>
      </div>
      <div className="watchlist-card-body">
        <div className="watchlist-chip"></div>
        <button onClick={handleNavigate} className="watchlist-button">View</button>
      </div>
    </div>
  );
};

WatchlistSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default WatchlistSection;