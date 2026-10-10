
import { useState } from "react";
import { useMusic } from "../context/MusicContext";
import { Link } from "react-router-dom";
import PlaylistCover from "../components/PlaylistCover";
function Playlists() {
 const { playlists, songs, createPlaylist, deletePlaylist } = useMusic();
 const [name, setName] = useState("");
  const [playlistToDelete, setPlaylistToDelete] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    createPlaylist(name.trim());
    setName("");
  }

  function handleDelete() {
    if (!playlistToDelete) return;

    deletePlaylist(playlistToDelete.id);
    setPlaylistToDelete(null);
  }

  const inputStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #342943",
    background: "#17141f",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#A855F7",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  return (
    <main className="home-page">
      <p className="home-eyebrow">YOUR MUSIC, YOUR WAY</p>
      <h1>Your Playlists</h1>
      <p className="home-subtitle">
        Create collections for every mood.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          margin: "28px 0 34px",
          maxWidth: "650px",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Give your playlist a name..."
          aria-label="Playlist name"
          maxLength={50}
          style={{ ...inputStyle, flex: "1 1 240px", minWidth: 0 }}
        />

        <button type="submit" style={buttonStyle}>
          + Create playlist
        </button>
      </form>

      {playlists.length === 0 ? (
        <div
          style={{
            padding: "42px 20px",
            textAlign: "center",
            border: "1px dashed #494052",
            borderRadius: "18px",
            background: "#111019",
            maxWidth: "650px",
          }}
        >
          <div style={{ fontSize: "42px", marginBottom: "12px" }}>
            🎧
          </div>
          <h3 style={{ marginBottom: "8px" }}>Your music starts here</h3>
          <p className="home-subtitle">
            Create your first playlist and collect songs you love.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <h2 style={{ fontSize: "20px", margin: 0 }}>
              Your collection
            </h2>
            <span className="home-subtitle">
              {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: "20px",
            }}
          >
            {playlists.map((playlist) => (
              <article
                key={playlist.id}
                style={{
                  padding: "20px",
                  borderRadius: "18px",
                  background: "linear-gradient(145deg, #1c1728, #121019)",
                  border: "1px solid #30263d",
                  minWidth: 0,
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
  <PlaylistCover
    songs={songs.filter((song) => playlist.songIds.includes(song.id))}
    size={192}
  />
</div>

                <h3
                  style={{
                    fontSize: "19px",
                    margin: "0 0 8px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {playlist.name}
                </h3>

                <p className="home-subtitle" style={{ marginBottom: "18px" }}>
                  {playlist.songIds.length}{" "}
                  {playlist.songIds.length === 1 ? "song" : "songs"}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    to={`/playlist/${playlist.id}`}
                    style={{
                      ...buttonStyle,
                      flex: 1,
                      textAlign: "center",
                      textDecoration: "none",
                      padding: "10px",
                    }}
                  >
                    Open playlist
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPlaylistToDelete(playlist)}
                    aria-label={`Delete ${playlist.name}`}
                    title="Delete playlist"
                    style={{
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: "1px solid #59313e",
                      background: "#24151e",
                      color: "#FCA5A5",
                      cursor: "pointer",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {playlistToDelete && (
        <div
          onClick={() => setPlaylistToDelete(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-playlist-title"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "28px",
              borderRadius: "20px",
              background: "#17141f",
              border: "1px solid #493657",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>
              🗑️
            </div>

            <h2 id="delete-playlist-title" style={{ marginBottom: "12px" }}>
              Delete playlist?
            </h2>

            <p style={{ color: "#B8ADC9", lineHeight: 1.6 }}>
              Are you sure you want to delete "{playlistToDelete.name}"?
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "26px",
              }}
            >
              <button
                type="button"
                onClick={() => setPlaylistToDelete(null)}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  background: "transparent",
                  border: "1px solid #494052",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                style={{ ...buttonStyle, flex: 1, background: "#DC4664" }}
              >
                Delete playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Playlists;
