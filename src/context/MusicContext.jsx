
import { createContext, useContext, useEffect, useState } from "react";
import songs from "../data/song.js";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [playlists, setPlaylists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("soundify-playlists")) || [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("soundify-favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("soundify-playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem("soundify-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function createPlaylist(name) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    setPlaylists((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        name: trimmedName,
        songIds: [],
      },
    ]);
  }

  function deletePlaylist(id) {
    setPlaylists((current) =>
      current.filter((playlist) => playlist.id !== id)
    );
  }

  function addSongToPlaylist(playlistId, songId) {
    setPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId &&
        !playlist.songIds.includes(songId)
          ? {
              ...playlist,
              songIds: [...playlist.songIds, songId],
            }
          : playlist
      )
    );
  }

  function removeSongFromPlaylist(playlistId, songId) {
    setPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songIds: playlist.songIds.filter((id) => id !== songId),
            }
          : playlist
      )
    );
  }

  function toggleFavorite(songId) {
    setFavorites((current) =>
      current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId]
    );
  }

  return (
    <MusicContext.Provider
      value={{
        songs,
        playlists,
        favorites,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        toggleFavorite,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
