
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import "./index.css";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Favorites from "./pages/Favorites";
import MusicPlayer from "./components/MusicPlayer";
import RecentlyPlayed from "./components/RecentlyPlayed";
function PlaceholderPage({ title }) {
  return (
    <main className="home-page">
      <h1>{title}</h1>
      <p className="home-subtitle">
        This section will be connected when the team modules are integrated.
      </p>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="music-app">
      <Navbar />

      <div className="music-body">
        <Sidebar />

        <div className="music-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<PlaceholderPage title="Search Songs" />}
            />
            <Route
              path="/favorites"
              element={<Favorites />}
            />
            <Route path="/playlists" element={<Playlists />} />
            <Route
              path="/song/:id"
              element={<PlaceholderPage title="Song Details" />}
            />
            <Route
              path="/playlist/:id"
              element={<PlaylistDetails />}
            />
            <Route
              path="*"
              element={<PlaceholderPage title="Page Not Found" />}
            />
          </Routes>
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import SongList from "./components/SongList";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">♫ Music Vibes</h2>

        {["Home", "Favorites", "Playlists", "Recently Played"].map(
          (item) => (
            <button
              key={item}
              className={
                activeMenu === item ? "menu-item active" : "menu-item"
              }
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          )
        )}

        <div className="sidebar-note">
          <span>🎧</span>
          <h3>Good music, good mood.</h3>
          <p>Find your next favourite song.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="hero">
          <div>
            <p className="welcome">WELCOME TO MUSIC VIBES</p>
            <h1>Your Music Playlist <span>♫</span></h1>
            <p className="subtitle">
              Discover your favourite songs. Feel every beat.
            </p>
          </div>
          <div className="hero-art">🎧</div>
        </header>

        <SongList />
        
        <footer>♫ Music brings people together ♥</footer>
      </main>
    </div>
  );
}

export default App;
