import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoadingOverlay from '../LoadingOverlay';
import '../../styles/userstyles/watchlistsection.css';

const WatchlistSection = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/watchlist', { state: { user: { id } } });
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="card premium-card">
      {loading && <LoadingOverlay />}
      <div className="card-header">
        <h2 className="watchlist-title">WatchList</h2>
      </div>
      <div className="card-body">
        <div className="wallet-chip"></div>
        <button onClick={handleNavigate} className="watchlist-button">View</button>
      </div>
    </div>
  );
};

WatchlistSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WatchlistSection;