
import { useEffect, useRef, useState } from "react";
import { useMusic } from "../context/MusicContext";

function PreviousIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5v14M19 6 9 12l10 6V6Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 5v14M5 6l10 6-10 6V6Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h4v14H7zM15 5h4v14h-4z" />
    </svg>
  );
}

export default function MusicPlayer() {
  const {
    songs,
    currentSongId,
    playSong,
    playNextSong,
    playPreviousSong,
  } = useMusic();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong =
    songs.find((song) => song.id === currentSongId) || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    audio.load();
  }, [currentSongId]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    } else {
      audio.pause();
    }
  }

  function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  if (!currentSong) {
    return (
      <div className="music-player">
        <p>Select a song to start playing.</p>
      </div>
    );
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration)
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={playNextSong}
      />

      <div className="player-song-info">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="player-album-cover"
        />

        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button
          type="button"
          onClick={playPreviousSong}
          aria-label="Previous song"
          title="Previous song"
        >
          <PreviousIcon />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="play-pause-button"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          type="button"
          onClick={playNextSong}
          aria-label="Next song"
          title="Next song"
        >
          <NextIcon />
        </button>
      </div>

      <div className="player-progress">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(event.target.value);
            }
          }}
          aria-label="Song progress"
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
