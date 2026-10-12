
import { useMusic } from "../context/MusicContext";
import { Link } from "react-router-dom";
import RecentlyPlayed from "../components/RecentlyPlayed";

function Home() {
  const { songs, favorites, toggleFavorite, playSong } = useMusic();

  return (
    <main className="home-page">
      <section className="home-welcome">
        <p className="home-eyebrow">YOUR MUSIC, YOUR MOOD</p>
        <h1>Good Evening</h1>
        <p className="home-subtitle">
          Your music collection, all in one place.
        </p>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>Your Music</h2>
            <p className="home-subtitle">
              {songs.length}{" "}
              {songs.length === 1 ? "song" : "songs"} in your collection
            </p>
          </div>
        </div>

        <div className="song-grid">
          {songs.map((song) => {
            const isFavorite = favorites.includes(song.id);

            return (
              <article className="home-song-card" key={song.id}>
                <Link
                  to={`/song/${song.id}`}
                  onClick={() => playSong(song.id)}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <div className="song-image-wrapper">
                    <img
                      src={song.image}
                      alt={`${song.title} cover`}
                      className="home-song-image"
                      loading="lazy"
                    />
                  </div>

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
                  title={
                    isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
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
              </article>
            );
          })}
        </div>

        {songs.length === 0 && (
          <p className="empty-playlists">
            No songs have been added yet.
          </p>
        )}
      </section>

      <section className="home-section recently-played-section">
        <h2 className="recently-played-title">Recently Played</h2>
        <RecentlyPlayed />
      </section>
    </main>
  );
}

export default Home;
