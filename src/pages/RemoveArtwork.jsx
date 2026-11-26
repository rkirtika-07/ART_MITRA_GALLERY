import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getArtworks, saveArtworks } from "../utils/galleryStorage";

function RemoveArtwork() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArtworks(getArtworks());
  }, []);

  const handleRemove = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this artwork?"
    );

    if (!confirmDelete) return;

    const updatedArtworks = artworks.filter(
      (artwork) => artwork.id !== id
    );

    saveArtworks(updatedArtworks);
    setArtworks(updatedArtworks);
    window.dispatchEvent(new Event("artworksUpdated"));

    alert("Artwork removed successfully!");
  };

  return (
    <div className="remove-artwork-page">
      <button onClick={() => navigate("/admin-dashboard")}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <h1>Remove Artworks</h1>

      {artworks.length === 0 ? (
        <p>No uploaded artworks available.</p>
      ) : (
        <div className="artwork-list">
          {artworks.map((artwork) => (
            <div className="artwork-card" key={artwork.id}>
              <img
                src={artwork.image}
                alt={artwork.title}
                width="150"
              />

              <h3>{artwork.title}</h3>
              <p>{artwork.artist}</p>

              <button onClick={() => handleRemove(artwork.id)}>
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RemoveArtwork;