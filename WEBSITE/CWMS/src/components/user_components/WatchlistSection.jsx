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
    <div className="user-watchlist-card user-watchlist-premium-card">
      {loading && <LoadingOverlay />}
      <div className="user-watchlist-card-header">
        <h2 className="user-watchlist-title">WatchList</h2>
      </div>
      <div className="user-watchlist-card-body">
        <div className="user-watchlist-chip"></div>
        <button onClick={handleNavigate} className="user-watchlist-button">View</button>
      </div>
    </div>
  );
};

WatchlistSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default WatchlistSection;