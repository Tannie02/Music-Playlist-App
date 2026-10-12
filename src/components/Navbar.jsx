
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="music-navbar">
      <Link to="/" className="music-brand">
        <span className="brand-icon">♫</span>

        <span className="brand-text">
          <span className="brand-name">Soundify</span>
          <span className="brand-tagline">
            YOUR SOUND. YOUR WORLD.
          </span>
        </span>
      </Link>

      <div className="navbar-right">
        <div className="listening-space">
          <span className="headphone-icon">♬</span>
          <span>Your listening space</span>
        </div>

        <Link
          to="/playlists"
          className="navbar-library-link"
          aria-label="Your Library"
          title="Your Library"
        >
           ♬
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
