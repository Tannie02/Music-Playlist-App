import { useParams, Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

function SongDetails() {
  const { id } = useParams();
  const { songs, favorites, toggleFavorite, playSong, currentSongId } =
    useMusic();

  const song = songs.find((item) => item.id === Number(id));

  if (!song) {
    return (
      <main className="home-page">
        <h2>Song not found</h2>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  const isFavorite = favorites.includes(song.id);
  const isCurrentSong = currentSongId === song.id;

  return (
    <main className="home-page song-details-page">
      <Link to="/" className="see-all-button">
        ← Back to Home
      </Link>

      <section className="song-details-card">
        <img
          src={song.image}
          alt={`${song.title} cover`}
          className="song-details-image"
        />

        <div className="song-details-info">
          <p className="home-eyebrow">SONG DETAILS</p>
          <h1>{song.title}</h1>
          <p className="home-subtitle">{song.artist}</p>

          <p><strong>Album:</strong> {song.album || "Unknown Album"}</p>
          <p><strong>Genre:</strong> {song.genre || "Unknown Genre"}</p>

          {isCurrentSong && (
            <p className="home-eyebrow">Currently selected in player</p>
          )}

          <div className="song-details-actions">
            <button
              type="button"
              className="genre-chip selected"
              onClick={() => playSong(song.id)}
            >
              ▶ Play Song
            </button>

            <button
              type="button"
              className="genre-chip"
              onClick={() => toggleFavorite(song.id)}
            >
              {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SongDetails;