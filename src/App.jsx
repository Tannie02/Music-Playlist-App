import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Favorites from "./pages/Favorites";
import MusicPlayer from "./components/MusicPlayer";
import SongDetails from "./pages/SongDetails";
import Search from "./pages/Search";

import "./App.css";
import "./index.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Show Navbar only on the Home page
  const showNavbar = location.pathname === "/";

  return (
    <div className="music-app">
      {showNavbar && (
        <Navbar/>
      )}

      <div className="music-body">
        <Sidebar />

        <div className="music-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              }
            />

            <Route path="/search" element={<Search />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/playlists" element={<Playlists />} />

            <Route path="/song/:id" element={<SongDetails />} />

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
