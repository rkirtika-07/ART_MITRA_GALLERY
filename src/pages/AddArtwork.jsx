
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { getArtworks, saveArtworks } from "../utils/galleryStorage";

function AddArtwork() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    category: "",
    price: "",
    description: "",
    image: ""
  });

  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, image: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an artwork image.");
      return;
    }

    const newArtwork = {
      ...form,
      id: Date.now(),
      price: Number(form.price)
    };

    saveArtworks([...getArtworks(), newArtwork]);
    window.dispatchEvent(new Event("artworksUpdated"));

    alert("Artwork added successfully!");
    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-card">

        <button className="back-button" onClick={() => navigate("/admin-dashboard")}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <p className="admin-form-eyebrow">ARTMITHRA ADMIN</p>
        <h1>Add New Artwork</h1>
        <p className="admin-form-subtitle">
          Add a beautiful new creation to your gallery.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Artwork Title</label>
          <input
            required
            placeholder="Enter artwork title"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />

          <label>Artist Name</label>
          <input
            required
            placeholder="Enter artist name"
            value={form.artist}
            onChange={(e) => setForm({...form, artist: e.target.value})}
          />

          <label>Category</label>
          <select
            required
            value={form.category}
            onChange={(e) => setForm({...form, category: e.target.value})}
          >
            <option value="">Select category</option>
            <option>Painting</option>
            <option>Digital Art</option>
            <option>Photography</option>
            <option>Sculpture</option>
            <option>Abstract Art</option>
            <option>Traditional Art</option>
          </select>

          <label>Price (₹)</label>
          <input
            type="number"
            min="0"
            required
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => setForm({...form, price: e.target.value})}
          />

          <label>Description</label>
          <textarea
            required
            placeholder="Describe this artwork..."
            rows="4"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />

          <label>Artwork Image</label>
          <label className="image-upload-box">
            <Upload size={28} />
            <span>Click to upload an image</span>
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>

          {preview && (
            <img className="artwork-preview" src={preview} alt="Artwork preview" />
          )}

          <button className="admin-submit-button" type="submit">
            Add Artwork
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddArtwork;
