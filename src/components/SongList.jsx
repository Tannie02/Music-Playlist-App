import { useState } from "react";
import SongCard from "./SongCard";

function SongList({ songs }) {
  console.log("SongList component is running");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs?.filter((song) =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (!songs || songs.length === 0) {
    return <p className="home-subtitle">No songs found.</p>;
  }

  return (
    <>
      <input
  type="text"
  placeholder="Type here..."
  className="song-search"
  onChange={(e) => alert(e.target.value)}
/>

      {filteredSongs.length === 0 ? (
        <p className="home-subtitle">No matching songs found.</p>
      ) : (
        <div className="song-grid">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </>
  );
}

export default SongList;