
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import "./index.css";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Favorites from "./pages/Favorites";
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
