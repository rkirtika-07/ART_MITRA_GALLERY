import "./FeaturedArtist.css";

function FeaturedArtist() {
  return (
    <section className="featured-artist">
      <div className="featured-artist-image">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800"
          alt="Featured artist"
        />
      </div>

      <div className="featured-artist-content">
        <p className="eyebrow">ARTMITHRA SPOTLIGHT</p>
        <h2>Featured Artist of the Week</h2>
        <h3>Aarohi Mehta</h3>

        <p>
          "Art is the beautiful expression of thoughts,
          emotions and imagination. Every artwork tells
          a story beyond words."
        </p>

        <a href="/artists">DISCOVER THE ARTIST ↗</a>
      </div>
    </section>
  );
}

export default FeaturedArtist;