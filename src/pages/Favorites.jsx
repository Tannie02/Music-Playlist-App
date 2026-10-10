
import { useMusic } from "../context/MusicContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { songs, favorites, toggleFavorite } = useMusic();

  const favoriteSongs = songs.filter((song) =>
    favorites.includes(song.id)
  );

  return (
    <main className="home-page">
      <p className="home-eyebrow">YOUR PERSONAL COLLECTION</p>
      <h1>♡ Your Favorites</h1>
      <p className="home-subtitle">
        All the songs you love, in one place.
      </p>

      {favoriteSongs.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            padding: "45px 20px",
            textAlign: "center",
            border: "1px dashed #494052",
            borderRadius: "18px",
            background: "#111019",
            maxWidth: "650px",
          }}
        >
          <div style={{ fontSize: "44px", marginBottom: "12px" }}>
            ♡
          </div>
          <h3 style={{ marginBottom: "8px" }}>Nothing here yet</h3>
          <p className="home-subtitle">
            Find a song you love and tap its heart to save it here.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "11px 18px",
              borderRadius: "12px",
              background: "#A855F7",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Explore songs
          </Link>
        </div>
      ) : (
        <>
          <p
            className="home-subtitle"
            style={{ marginTop: "24px", marginBottom: "18px" }}
          >
            {favoriteSongs.length}{" "}
            {favoriteSongs.length === 1 ? "song" : "songs you love"}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 220px))",
              gap: "20px",
            }}
          >
            {favoriteSongs.map((song) => (
              <article
                key={song.id}
                style={{
                  padding: "16px",
                  borderRadius: "18px",
                  background: "linear-gradient(145deg, #1c1728, #121019)",
                  border: "1px solid #30263d",
                  minWidth: 0,
                }}
              >
                <Link
                  to={`/song/${song.id}`}
                  style={{ display: "block" }}
                  aria-label={`View ${song.title}`}
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "12px",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                </Link>

                <h3
                  style={{
                    marginTop: "14px",
                    marginBottom: "6px",
                    fontSize: "17px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {song.title}
                </h3>

                <p className="home-subtitle" style={{ marginBottom: "16px" }}>
                  {song.artist}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <Link
                    to={`/song/${song.id}`}
                    style={{
                      color: "#C4B5FD",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    View song →
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(song.id)}
                    aria-label={`Remove ${song.title} from favorites`}
                    title="Remove from favorites"
                    style={{
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: "#24151e",
                      border: "1px solid #59313e",
                      color: "#FCA5A5",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    ♥ Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Favorites;
