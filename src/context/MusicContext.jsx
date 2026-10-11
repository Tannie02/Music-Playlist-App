
import { createContext, useContext, useEffect, useState } from "react";
import songs from "../data/song.js";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [playlists, setPlaylists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("soundify-playlists")) || [];
    } catch {
      return [];
    }
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("soundify-recently-played")
      ) || [];
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

  useEffect(() => {
    localStorage.setItem(
      "soundify-recently-played",
      JSON.stringify(recentlyPlayed)
    );
  }, [recentlyPlayed]);

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

  function playSong(songId) {
    setCurrentSongId(songId);
    setRecentlyPlayed((current) => [
      songId,
      ...current.filter((id) => id !== songId),
    ].slice(0, 10));
  }

  function playNextSong() {
    if (!songs.length) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSongId
    );
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex].id);
  }

  function playPreviousSong() {
    if (!songs.length) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSongId
    );
    const previousIndex =
      currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    playSong(songs[previousIndex].id);
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
        currentSongId,
        recentlyPlayed,
        playSong,
        playNextSong,
        playPreviousSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
