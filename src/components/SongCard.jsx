import { Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

function SongCard({ song }) {
  const { favorites, toggleFavorite } = useMusic();

  const isFavorite = favorites.includes(song.id);

  return (
    <div className="song-card">
      <Link
        to={`/song/${song.id}`}
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
