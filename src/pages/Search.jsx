
import { useMemo, useState } from "react";
import { useMusic } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import "../App.css";

const genres = ["All", "Romance", "Pop", "Peppy", "Moody"];

function Search() {
  const { songs } = useMusic();

  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredSongs = useMemo(() => {
    const search = query.trim().toLowerCase();

    return songs.filter((song) => {
      const matchesGenre =
        selectedGenre === "All" ||
        song.genre?.toLowerCase() === selectedGenre.toLowerCase();

      const matchesSearch =
        !search ||
        [song.title, song.artist, song.album]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(search)
          );

      return matchesGenre && matchesSearch;
    });
  }, [songs, query, selectedGenre]);

  return (
    <main className="home-page search-page">
      <section className="home-welcome">
        <p className="home-eyebrow">FIND YOUR NEXT FAVORITE</p>
        <h1>Search & Discover</h1>
        <p className="home-subtitle">
          Search your songs or explore by mood and genre.
        </p>
      </section>

      <input
        type="search"
        className="search-input"
        placeholder="Search songs, artists, or albums..."
        aria-label="Search songs, artists, or albums"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <section className="genre-section">
        <h2>Browse by genre</h2>

        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`genre-chip ${
                selectedGenre === genre ? "selected" : ""
              }`}
              aria-pressed={selectedGenre === genre}
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
              {query.trim()
                ? "Search Results"
                : selectedGenre === "All"
                ? "All Songs"
                : `${selectedGenre} Songs`}
            </h2>

            <p className="home-subtitle">
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1 ? "song" : "songs"} found
            </p>
          </div>

          {(query || selectedGenre !== "All") && (
            <button
              type="button"
              className="see-all-button"
              onClick={() => {
                setQuery("");
                setSelectedGenre("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredSongs.length > 0 ? (
          <div className="song-grid">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <p className="empty-playlists">
            No songs found. Try another search or genre.
          </p>
        )}
      </section>
    </main>
  );
}

export default Search;
