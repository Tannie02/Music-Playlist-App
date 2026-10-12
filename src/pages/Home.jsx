
import { useState } from "react";
import { useMusic } from "../context/MusicContext";
import { Link } from "react-router-dom";

const genres = ["All", "Other", "Indie", "Pop"];

function Home({ searchQuery = "", onSearchChange }) {
  const { songs, favorites, toggleFavorite } = useMusic();
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query);

    const matchesGenre =
      selectedGenre === "All" ||
      song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <main className="home-page">
      <section className="home-welcome">
        <p className="home-eyebrow">YOUR MUSIC, YOUR MOOD</p>
        <h1>Good Evening</h1>
        <p className="home-subtitle">
          Your music collection, all in one place.
        </p>
      </section>

      <section className="genre-section">
        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`genre-chip ${
                selectedGenre === genre ? "selected" : ""
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>
              {searchQuery.trim() ? "Search Results" : "Your Music"}
            </h2>

            <p className="home-subtitle">
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1 ? "song" : "songs"}
              {searchQuery.trim()
                ? ` found for "${searchQuery}"`
                : " in your collection"}
            </p>
          </div>

          {(selectedGenre !== "All" || searchQuery.trim()) && (
            <button
              className="see-all-button"
              type="button"
              onClick={() => {
                setSelectedGenre("All");
                onSearchChange?.("");
              }}
            >
              Show all
            </button>
          )}
        </div>

        {filteredSongs.length > 0 ? (
          <div className="song-grid">
            {filteredSongs.map((song) => {
              const isFavorite = favorites.includes(song.id);

              return (
                <article className="home-song-card" key={song.id}>
                  <Link
                    to={`/song/${song.id}`}
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
        ) : (
          <p className="empty-playlists">
            {searchQuery.trim()
              ? `No songs found for "${searchQuery}".`
              : "No songs found in this genre."}
          </p>
        )}
      </section>

      <section className="home-section recently-section">
        <div className="section-heading">
          <h2>Recently Played</h2>
        </div>

        <p className="empty-playlists">
          Songs you listen to will appear here.
        </p>
      </section>
    </main>
  );
}

export default Home;
