import { useMusic } from "../context/MusicContext";

export default function RecentlyPlayed() {
  const { songs, recentlyPlayed, playSong } = useMusic();

  const recentSongs = recentlyPlayed
    .map((id) => songs.find((song) => song.id === id))
    .filter(Boolean);

  return (
    <section className="recently-played">
      {recentSongs.length === 0 ? (
        <p>Your recently played songs will appear here.</p>
      ) : (
        <div className="recently-played-list">
          {recentSongs.map((song) => (
            <button
              key={song.id}
              className="recently-played-item"
              onClick={() => playSong(song.id)}
            >
              <img src={song.image} alt="" />
              <span>
                <strong>{song.title}</strong>
                <small>{song.artist}</small>
              </span>

              <span>▶</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
