
import { NavLink, Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import PlaylistCover from "./PlaylistCover";

const navigationItems = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Search", path: "/search", icon: "⌕" },
  { label: "Your Library", path: "/playlists", icon: "▤" },
  { label: "Favorites", path: "/favorites", icon: "♥" },
];

function Sidebar() {
  const { playlists, songs } = useMusic();

  return (
    <aside className="music-sidebar">
      <nav className="sidebar-navigation">
        <p className="sidebar-heading">MENU</p>

        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-playlists">
        <p className="sidebar-heading">YOUR PLAYLISTS</p>

        {playlists.length === 0 ? (
          <p className="sidebar-empty">
            Your created playlists will appear here.
          </p>
        ) : (
          playlists.map((playlist) => {
            const playlistSongs = songs.filter((song) =>
              playlist.songIds.includes(song.id)
            );

            return (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="sidebar-playlist-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  color: "inherit",
                  textDecoration: "none",
                  borderRadius: "8px",
                  minWidth: 0,
                }}
              >
                <PlaylistCover songs={playlistSongs} size={38} />

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {playlist.name}
                  </div>

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#A89BBE",
                      marginTop: "3px",
                    }}
                  >
                    Playlist · {playlistSongs.length} songs
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
