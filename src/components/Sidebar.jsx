
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Search", path: "/search", icon: "⌕" },
  { label: "Your Library", path: "/playlists", icon: "▤" },
  { label: "Playlists", path: "/playlists", icon: "▣" },
  { label: "Favorites", path: "/favorites", icon: "♥" },
];

const samplePlaylists = [
  "Chill Vibes",
  "Study Mix",
  "Late Night",
  "Workout",
];

function Sidebar() {
  return (
    <aside className="music-sidebar">
      <nav className="sidebar-navigation">
        <p className="sidebar-heading">MENU</p>

        {navigationItems.map((item, index) => (
          <NavLink
            key={`${item.label}-${index}`}
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
        <p className="sidebar-empty">
            Your created playlists will appear here.
        </p>
        </div>
            </aside>
        );
        }

export default Sidebar;
