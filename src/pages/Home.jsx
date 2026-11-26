import { ArrowRight, ArrowUpRight } from "lucide-react";
import FeaturedArtist from "./FeaturedArtist";

function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER THE WORLD OF ART</p>

          <h1>
            Art is not what
            <br />
            you see, but what
            <br />
            you <span>feel.</span>
          </h1>

          <p className="hero-description">
            Explore extraordinary artworks, discover talented
            artists and bring creativity into your world.
          </p>

          <a href="/gallery" className="primary-btn">
            EXPLORE GALLERY <ArrowRight size={18} />
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1000"
            alt="Beautiful classical painting"
          />

          <div className="image-label">
            <span>01 / COLLECTION</span>
            <ArrowUpRight />
          </div>
        </div>
      </section>

      {/* FEATURED ARTIST SECTION */}
      <FeaturedArtist />

      {/* INTRO SECTION */}
      <section className="intro-section">
        <p className="eyebrow">A WORLD BEYOND CANVAS</p>

        <h2>
          Discover art that speaks
          <br />
          <span>without words.</span>
        </h2>

        <p>
          From timeless paintings to contemporary sculptures,
          explore a curated collection of artistic expressions.
        </p>
      </section>

      {/* EXPLORE COLLECTIONS */}
      <section className="category-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE COLLECTIONS</p>
            <h2>Find your inspiration</h2>
          </div>

          <a href="/gallery">
            VIEW ALL <ArrowRight size={16} />
          </a>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700"
              alt="Paintings"
            />
            <h3>Paintings</h3>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=700"
              alt="Abstract art"
            />
            <h3>Abstract Art</h3>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=700"
              alt="Sculptures"
            />
            <h3>Sculptures</h3>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;