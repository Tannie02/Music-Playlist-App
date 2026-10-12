import { Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

function SongCard({ song }) {
  const { favorites, toggleFavorite, playSong } = useMusic();

  const isFavorite = favorites.includes(song.id);

  return (
    <div className="song-card">
      <Link
        to={`/song/${song.id}`}
        onClick={() => playSong(song.id)}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={song.image} alt={song.title} />
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(song.id)}
        aria-label={
          isFavorite
            ? `Remove ${song.title} from favorites`
            : `Add ${song.title} to favorites`
        }
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        style={{
          background: "transparent",
          border: "none",
          color: isFavorite ? "#F472B6" : "#C4B5FD",
          fontSize: "24px",
          cursor: "pointer",
          padding: "4px 0",
        }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default SongCard;
function SongCard({ song }) {
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <p>{song.genre}</p>
    </div>
  );
}

export default SongCard;
function SongCard({ song, isFavorite, onToggleFavorite }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={song.image}
        className="card-img-top"
        alt={song.title}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">{song.title}</h5>
        <p className="card-text">{song.artist}</p>
        <p className="text-muted">{song.genre}</p>

        <button
          className={`btn ${
            isFavorite ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => onToggleFavorite(song.id)}
        >
          {isFavorite ? " Remove Favorite" : "♡ Add Favorite"}
        </button>
      </div>
    </div>
  );
}

export default SongCard;
