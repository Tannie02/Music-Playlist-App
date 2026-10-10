
import { useState } from "react";

function CreatePlaylist({ onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const playlistName = name.trim();

    if (!playlistName) return;

    onCreate({
      id: Date.now(),
      name: playlistName,
      songs: [],
    });

    setName("");
  };

  return (
    <form className="create-playlist" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter playlist name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Playlist name"
        maxLength={50}
      />

      <button type="submit">+ Create Playlist</button>
    </form>
  );
}

export default CreatePlaylist;
