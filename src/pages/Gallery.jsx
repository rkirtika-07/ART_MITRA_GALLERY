import { useState, useEffect } from "react";
import "./Gallery.css";

import {
  Search,
  Heart,
  ArrowUpRight,
  ShoppingCart,
  Check,
} from "lucide-react";

import { useSearchParams } from "react-router-dom";
import { getArtworks } from "../utils/galleryStorage";

// Default artworks
const defaultArtworks = [
  {
    id: 1,
    title: "Abstract Dreams",
    artist: "Olivia Bennett",
    category: "Abstract",
    price: 4500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
  },
  {
    id: 2,
    title: "Golden Silence",
    artist: "James Wilson",
    category: "Painting",
    price: 6200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
  },
  {
    id: 3,
    title: "Modern Sculpture",
    artist: "Sophia Miller",
    category: "Sculpture",
    price: 8500,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800",
  },
  {
    id: 4,
    title: "Nature's Beauty",
    artist: "Emma Rose",
    category: "Painting",
    price: 3900,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
  },
  {
    id: 5,
    title: "Colorful World",
    artist: "Daniel Smith",
    category: "Abstract",
    price: 5500,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
  },
  {
    id: 6,
    title: "Silent Memories",
    artist: "Isabella Clark",
    category: "Photography",
    price: 4800,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
  },
];

// Current logged-in user
function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem("artmithra_currentUser") || "null"
    );
  } catch {
    return null;
  }
}

// Get cart items
function getCartItems(user) {
  if (!user) return [];

  try {
    const allCarts = JSON.parse(
      localStorage.getItem("artmithra_cart") || "{}"
    );

    return allCarts[user.id] || [];
  } catch {
    return [];
  }
}

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Load default and admin-added artworks
  const [artworks, setArtworks] = useState(() => [
    ...defaultArtworks,
    ...getArtworks()
  ]);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  const [cartItems, setCartItems] = useState(() =>
    getCartItems(getCurrentUser())
  );

  const [addedArtwork, setAddedArtwork] = useState(null);

  // Categories
  const categories = [
    "All",
    "Painting",
    "Abstract",
    "Abstract Art",
    "Sculpture",
    "Photography",
    "Digital Art",
    "Traditional Art"
  ];

  // Update artworks when admin adds new paintings
  useEffect(() => {
    const updateArtworks = () => {
      setArtworks([
        ...defaultArtworks,
        ...getArtworks()
      ]);
    };

    window.addEventListener("storage", updateArtworks);
    window.addEventListener("artworksUpdated", updateArtworks);

    return () => {
      window.removeEventListener("storage", updateArtworks);
      window.removeEventListener("artworksUpdated", updateArtworks);
    };
  }, []);

  // Update search URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    setSearchParams(params, { replace: true });
  }, [search]);

  // Refresh cart when logged-in account or cart changes
  useEffect(() => {
    const handleStorageChange = () => {
      const user = getCurrentUser();

      setCurrentUser(user);
      setCartItems(getCartItems(user));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  // Toggle favorites
  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  // Add artwork to cart
  const addToCart = (artwork) => {
    const user = getCurrentUser();

    if (!user) {
      alert("Please login first to add artworks to your cart.");
      return;
    }

    const allCarts = JSON.parse(
      localStorage.getItem("artmithra_cart") || "{}"
    );

    const userCart = allCarts[user.id] || [];

    const alreadyAdded = userCart.some(
      (item) => item.id === artwork.id
    );

    if (alreadyAdded) {
      alert("This artwork is already in your cart.");
      setCartItems(userCart);
      return;
    }

    const updatedCart = [
      ...userCart,
      {
        ...artwork,
        quantity: 1,
        userId: user.id,
        userEmail: user.email,
      },
    ];

    allCarts[user.id] = updatedCart;

    localStorage.setItem(
      "artmithra_cart",
      JSON.stringify(allCarts)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setCurrentUser(user);
    setCartItems(updatedCart);
    setAddedArtwork(artwork.id);

    setTimeout(() => {
      setAddedArtwork(null);
    }, 1500);
  };

  // Check whether artwork is in cart
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // Filter artworks
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory =
      activeCategory === "All" ||
      artwork.category === activeCategory;

    const matchesSearch =
      artwork.title.toLowerCase().includes(search.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gallery-page">

      {/* Gallery Header */}
      <section className="gallery-header">

        <p className="gallery-subtitle">
          DISCOVER CREATIVITY
        </p>

        <h1>Explore Our Gallery</h1>

        <p className="gallery-description">
          Discover beautiful artworks created by talented artists.
          Find something special for your space.
        </p>

      </section>

      {/* Search and Categories */}
      <section className="gallery-controls">

        <div className="gallery-search">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search artworks or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="gallery-categories">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* Artwork Grid */}
      <section className="artwork-grid">

        {filteredArtworks.length > 0 ? (

          filteredArtworks.map((artwork) => (

            <div className="artwork-card" key={artwork.id}>

              {/* Artwork Image */}
              <div className="artwork-image-wrapper">

                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="artwork-image"
                />

                {/* Favorite Button */}
                <button
                  className={
                    favorites.includes(artwork.id)
                      ? "favorite-btn favorited"
                      : "favorite-btn"
                  }
                  onClick={() => toggleFavorite(artwork.id)}
                  aria-label="Add to favorites"
                >

                  <Heart
                    size={20}
                    fill={
                      favorites.includes(artwork.id)
                        ? "currentColor"
                        : "none"
                    }
                  />

                </button>

                <span className="artwork-category">
                  {artwork.category}
                </span>

              </div>

              {/* Artwork Details */}
              <div className="artwork-details">

                <p className="artwork-artist">
                  {artwork.artist}
                </p>

                <h3>{artwork.title}</h3>

                <div className="artwork-bottom">

                  <span className="artwork-price">
                    ₹{Number(artwork.price).toLocaleString("en-IN")}
                  </span>

                  <button className="view-art-btn">
                    View <ArrowUpRight size={16} />
                  </button>

                </div>

                {/* Add to Cart */}
                <button
                  className={
                    isInCart(artwork.id)
                      ? "add-to-cart-btn added"
                      : "add-to-cart-btn"
                  }
                  onClick={() => addToCart(artwork)}
                  disabled={isInCart(artwork.id)}
                >

                  {isInCart(artwork.id) ? (

                    <>
                      <Check size={17} />

                      {addedArtwork === artwork.id
                        ? "Added Successfully"
                        : "Added to Cart"}
                    </>

                  ) : (

                    <>
                      <ShoppingCart size={17} />
                      Add to Cart
                    </>

                  )}

                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="no-artworks">

            <h3>No artworks found</h3>

            <p>
              Try searching with another name or category.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Gallery;