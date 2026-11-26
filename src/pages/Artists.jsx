import { useEffect, useState } from "react";
import "./Artists.css";
import { getArtists } from "../utils/galleryStorage";

const defaultArtists = [
  {
    id: 1,
    name: "Olivia Bennett",
    specialty: "Abstract Artist",
    works: 24,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
  },
  {
    id: 2,
    name: "James Wilson",
    specialty: "Modern Painter",
    works: 18,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
  },
  {
    id: 3,
    name: "Sophia Miller",
    specialty: "Sculpture Artist",
    works: 32,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400"
  },
  {
    id: 4,
    name: "Emma Rose",
    specialty: "Nature Artist",
    works: 15,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"
  }
];

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const loadArtists = () => {
      setArtists([...defaultArtists, ...getArtists()]);
    };

    loadArtists();

    window.addEventListener("artistsUpdated", loadArtists);

    return () => {
      window.removeEventListener("artistsUpdated", loadArtists);
    };
  }, []);

  return (
    <main className="artists-page">
      <section className="artists-heading">
        <p>MEET OUR CREATORS</p>
        <h1>Discover Our Artists</h1>
        <span>
          Meet the talented creators behind beautiful artworks.
        </span>
      </section>

      <section className="artists-grid">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <img
              src={artist.image}
              alt={artist.name}
              className="artist-image"
            />

            <div className="artist-info">
              <h2>{artist.name}</h2>
              <p>{artist.specialty}</p>
              <span>{artist.works} Artworks</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Artists;