import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/userstyles/searchsection.css';
import LoadingOverlay from '../LoadingOverlay';

const SearchSection = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewClick = () => {
    console.log('View button clicked');
    console.log('ID:', id);
    setIsLoading(true);
    setTimeout(() => {
      console.log('Navigating to /searchcrypto');
      navigate('/searchcrypto', { state: { user: { id } } });
    }, 1000); // Simulate a delay for loading
  };

  return (
    <div className="card premium-card">
      {isLoading && <LoadingOverlay />}
      <div className="card-header">
        <h2 className="view-title">View Crypto</h2>
      </div>
      <div className="card-body">
        <div className="wallet-chip"></div>
        <button onClick={handleViewClick} className="view-button">View</button>
      </div>
    </div>
  );
};

SearchSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SearchSection;