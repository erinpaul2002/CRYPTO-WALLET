
import { Link } from 'react-router-dom';
import '../../styles/userstyles/searchsection.css'

const SearchSection = () => (
  <section className="search">
    <div className="card">
      <h2>View Cryptocurrencies</h2>
      <br />
      <Link to="/searchcrypto" className="view-button">
        View
      </Link>
    </div>
  </section>
);

export default SearchSection;