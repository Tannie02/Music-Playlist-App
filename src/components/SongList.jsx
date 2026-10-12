import { useState } from "react";
import songs from "../data/songs";
import SongCard from "./SongCard";
function SongList() {
  const [search, setSearch] = useState("");
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.genre.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="song-list">
      <h2>Music Playlist</h2>
      <input
        type="text"
        placeholder="Search songs, artists, or genres..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="songs-container">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default SongList;
import SongCard from "./SongCard";

function SongList({ songs }) {
  if (!songs || songs.length === 0) {
    return <p className="home-subtitle">No songs found.</p>;
  }

  return (
    <div className="song-grid">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
