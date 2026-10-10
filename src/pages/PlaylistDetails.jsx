
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import PlaylistCover from "../components/PlaylistCover";
function PlaylistDetails() {
  const { id } = useParams();
  const { playlists, songs, addSongToPlaylist, removeSongFromPlaylist } =
    useMusic();

  const [showSongs, setShowSongs] = useState(false);

  const playlist = playlists.find((item) => item.id === id);

  if (!playlist) {
    return (
      <main className="home-page">
        <h1>Playlist not found</h1>
        <Link to="/playlists">Back to Playlists</Link>
      </main>
    );
  }

  const playlistSongs = songs.filter((song) =>
    playlist.songIds.includes(song.id)
  );

  const availableSongs = songs.filter(
    (song) => !playlist.songIds.includes(song.id)
  );

  return (
    <main className="home-page">
      <p className="home-eyebrow">YOUR MUSIC, YOUR WAY</p>
      <Link to="/playlists" style={{ color: "#C4B5FD" }}>
        ← Back to Playlists
      </Link>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
    marginTop: "24px",
  }}
>
  <PlaylistCover songs={playlistSongs} size={180} />

  <div>
    <h1>{playlist.name}</h1>
    <p className="home-subtitle">
      {playlistSongs.length} songs in this playlist
    </p>
  </div>
</div>

      <button
        onClick={() => setShowSongs(!showSongs)}
        style={{
          padding: "12px 18px",
          margin: "20px 0",
          border: "none",
          borderRadius: "12px",
          background: "#A855F7",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {showSongs ? "Close Song List" : "+ Add Songs"}
      </button>

      {showSongs && (
        <section style={{ marginBottom: "30px" }}>
          <h2>Choose songs</h2>

          {availableSongs.length === 0 ? (
            <p className="home-subtitle">
              All available songs are already in this playlist.
            </p>
          ) : (
            availableSongs.map((song) => (
              <div
                key={song.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "14px",
                  marginTop: "10px",
                  background: "#14121c",
                  border: "1px solid #292335",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <strong>{song.title}</strong>
                  <p className="home-subtitle">{song.artist}</p>
                </div>

                <button
                  onClick={() => addSongToPlaylist(playlist.id, song.id)}
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#A855F7",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            ))
          )}
        </section>
      )}

      <h2>Songs</h2>

      {playlistSongs.length === 0 ? (
        <p className="home-subtitle">
          No songs yet. Click Add Songs to get started!
        </p>
      ) : (
        playlistSongs.map((song) => (
          <div
            key={song.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "14px",
              marginTop: "10px",
              background: "#14121c",
              border: "1px solid #292335",
              borderRadius: "12px",
            }}
          >
            <div>
              <strong>{song.title}</strong>
              <p className="home-subtitle">{song.artist}</p>
            </div>

            <button
              onClick={() =>
                removeSongFromPlaylist(playlist.id, song.id)
              }
              style={{
                background: "transparent",
                color: "#FCA5A5",
                border: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </main>
  );
}

export default PlaylistDetails;
