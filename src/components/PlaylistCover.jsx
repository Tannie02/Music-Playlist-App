
function PlaylistCover({ songs = [], size = 160 }) {
  const covers = songs
    .map((song) => song.image)
    .filter(Boolean)
    .slice(0, 4);

  const count = covers.length;

  return (
    <div
      style={{
        width: size,
        height: size,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #7C3AED, #C084FC)",
        display: "grid",
        gridTemplateColumns: count === 1 ? "1fr" : "1fr 1fr",
        gridTemplateRows: count <= 2 ? "1fr" : "1fr 1fr",
      }}
      aria-label="Playlist cover"
    >
      {count === 0 ? (
        <div
          style={{
            gridColumn: "1 / -1",
            gridRow: "1 / -1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "44px",
          }}
        >
          ♫
        </div>
      ) : (
        covers.map((image, index) => (
          <div
            key={`${image}-${index}`}
            style={{
              minWidth: 0,
              minHeight: 0,
              overflow: "hidden",
              gridColumn:
                count === 3 && index === 2 ? "1 / -1" : undefined,
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default PlaylistCover;
