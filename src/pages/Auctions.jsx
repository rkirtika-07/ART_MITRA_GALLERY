
import { useState } from "react";
import { Gavel, Clock, ArrowUpRight } from "lucide-react";
import "./Auctions.css";

const auctionItems = [
  {
    id: 1,
    title: "The Golden Horizon",
    artist: "Olivia Bennett",
    price: 4500,
    bids: 8,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=700"
  },
  {
    id: 2,
    title: "Dreamy Colours",
    artist: "James Wilson",
    price: 6200,
    bids: 12,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700"
  },
  {
    id: 3,
    title: "Nature's Canvas",
    artist: "Emma Rose",
    price: 3900,
    bids: 5,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700"
  },
  {
    id: 4,
    title: "Colorful Emotions",
    artist: "Daniel Smith",
    price: 5500,
    bids: 10,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=700"
  }
];

function Auctions() {
  const [bids, setBids] = useState({});

  const placeBid = (art) => {
    const currentBid = bids[art.id] || art.price;

    setBids({
      ...bids,
      [art.id]: currentBid + 500
    });

    alert("Your bid has been updated!");
  };

  return (
    <main className="auctions-page">

      <section className="auctions-heading">
        <p className="eyebrow">EXCLUSIVE ART EVENTS</p>
        <h1>Art <span>Auctions</span></h1>
        <p>
          Discover unique artworks and explore the excitement
          of art auctions.
        </p>
      </section>

      <section className="auctions-container">

        <div className="auction-intro">
          <div>
            <h2>Featured Auctions</h2>
            <p>Discover extraordinary pieces from talented artists.</p>
          </div>
          <Gavel size={30} />
        </div>

        <div className="auction-grid">

          {auctionItems.map((art) => (
            <div className="auction-card" key={art.id}>

              <div className="auction-image">
                <img src={art.image} alt={art.title} />
                <span className="auction-label">LIVE AUCTION</span>
              </div>

              <div className="auction-info">

                <p className="auction-artist">
                  {art.artist}
                </p>

                <h3>{art.title}</h3>

                <div className="auction-details">
                  <span>
                    <Gavel size={16} />
                    {art.bids} Bids
                  </span>

                  <span>
                    <Clock size={16} />
                    Open
                  </span>
                </div>

                <div className="auction-bottom">
                  <div>
                    <p>Current Bid</p>
                    <strong>
                      ₹{(bids[art.id] || art.price).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button onClick={() => placeBid(art)}>
                    Bid Now <ArrowUpRight size={17} />
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}

export default Auctions;
