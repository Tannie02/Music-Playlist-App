
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
