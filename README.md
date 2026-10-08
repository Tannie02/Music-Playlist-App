# 🎵 Music Playlist App

A Spotify-style music playlist frontend application built using **React.js and Bootstrap**.

The application allows users to browse, search, filter, and organize songs through features such as favorites, playlists, recently played songs, and a basic music player.

---

## 📌 Problem Statement

Users need a simple platform to browse, search, organize, and manage songs.

The Music Playlist App provides a Spotify-style interface where users can:

- Search for songs
- Filter songs by genre
- View song details
- Manage favorite songs
- Create and manage playlists
- View recently played songs
- Use a basic music player

---

## 🎯 Objectives

- Develop a Spotify-style music playlist application
- Implement song search and genre filtering
- Display song details
- Allow users to manage favorites
- Allow users to create and manage playlists
- Display recently played songs
- Provide a music-player interface
- Demonstrate React concepts such as:
  - Components
  - Props
  - State
  - Events
  - Lists
  - Conditional rendering
- Create a responsive interface using Bootstrap

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML & CSS | Structure and styling |
| Bootstrap | UI components and responsive design |
| React Router | Page navigation |
| Git & GitHub | Version control and collaboration |
| VS Code | Development |

### Optional

- LocalStorage – Store favorites and playlists
- Local audio files – Basic audio playback

> No external music API is required.

---

## 📂 Project Structure

```text
music-playlist-app/
│
├── public/
│   ├── images/
│   └── music/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SongCard.jsx
│   │   ├── SongList.jsx
│   │   ├── GenreFilter.jsx
│   │   ├── PlaylistCard.jsx
│   │   ├── CreatePlaylist.jsx
│   │   └── MusicPlayer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── SongDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── Playlists.jsx
│   │   └── PlaylistDetails.jsx
│   │
│   ├── data/
│   │   └── songs.js
│   │
│   ├── App.jsx
│   └── App.css
│
├── package.json
└── README.md