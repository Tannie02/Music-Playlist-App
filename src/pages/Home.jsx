import { useState } from "react";
import songs from "../data/song";

const genres = ["All", ...new Set(songs.map((song) => song.genre))];

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredSongs =
    selectedGenre === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);

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
            <h2>Your Music</h2>
            <p className="home-subtitle">
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1 ? "song" : "songs"} in your collection
            </p>
          </div>

          {selectedGenre !== "All" && (
            <button
              className="see-all-button"
              type="button"
              onClick={() => setSelectedGenre("All")}
            >
              Show all
            </button>
          )}
        </div>

        <div className="song-grid">
          {filteredSongs.map((song) => (
            <article className="home-song-card" key={song.id}>
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
            </article>
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <p className="empty-playlists">
            No songs found in this genre.
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

export default Home