
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/watchlistsection.css'

const WatchlistSection = ({ id }) => {
  const navigate = useNavigate();

  return (
    <section className="watchlist">
      <div className="card">
        <h2>Your Watchlist</h2>
        <br />
        <button onClick={() => navigate('/watchlist', { state: id })}>View</button>
      </div>
    </section>
  );
};
WatchlistSection.propTypes = {
  id: PropTypes.string.isRequired,
};


export default WatchlistSection;