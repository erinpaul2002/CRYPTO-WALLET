import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/searchsection.css';
import LoadingOverlay from '../LoadingOverlay';

const SearchSection = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewClick = () => {
    console.log('View button clicked');
    console.log('ID:', user.id);
    setIsLoading(true);
    setTimeout(() => {
      console.log('Navigating to /searchcrypto');
      navigate('/searchcrypto', { state: { user } });
    }, 1000); // Simulate a delay for loading
  };

  return (
    <div className="search-card search-premium-card">
      {isLoading && <LoadingOverlay />}
      <div className="search-card-header">
        <h2 className="search-title">View Crypto</h2>
      </div>
      <div className="search-card-body">
        <div className="search-chip"></div>
        <button onClick={handleViewClick} className="search-button">View</button>
      </div>
    </div>
  );
};

SearchSection.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchSection;