
import { Link } from "react-router-dom";

function Navbar({ searchQuery = "", onSearchChange }) {
  return (
    <header className="music-navbar">
      <Link to="/" className="music-brand">
        <span className="brand-icon">♫</span>
        <span>Soundify</span>
      </Link>

      <div className="navbar-search">
        <span className="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Search songs, artists or albums..."
          aria-label="Search songs, artists or albums"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange?.(event.target.value)
          }
        />
      </div>

      <Link to="/playlists" className="navbar-library-link">
        Your Library
      </Link>
    </header>
  );
}

export default Navbar;
