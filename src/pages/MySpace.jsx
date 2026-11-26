import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Wallet,
  Heart,
  User,
  Package,
  ArrowLeft,
  ShoppingCart,
  Trash2
} from "lucide-react";
import "./MySpace.css";

function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem("artmithra_currentUser") || "null"
    );
  } catch {
    return null;
  }
}

function getUserCart(currentUser) {
  if (!currentUser) return [];

  try {
    const allCarts = JSON.parse(
      localStorage.getItem("artmithra_cart") || "{}"
    );

    const userId = String(currentUser.id ?? currentUser._id ?? "");
    const userEmail = currentUser.email?.toLowerCase();

    // First: read cart using the logged-in user's ID
    if (userId && Array.isArray(allCarts[userId])) {
      return allCarts[userId];
    }

    // Fallback: find cart items matching user ID or email
    const allItems = Object.values(allCarts).flat();

    return allItems.filter(
      (item) =>
        (item.userId &&
          String(item.userId) === userId) ||
        (item.userEmail &&
          item.userEmail.toLowerCase() === userEmail)
    );
  } catch {
    return [];
  }
}

function MySpace() {
  const [user, setUser] = useState(getCurrentUser);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const loadMySpace = () => {
    const currentUser = getCurrentUser();

    setUser(currentUser);

    if (!currentUser) {
      setOrders([]);
      setWishlist([]);
      setCartItems([]);
      return;
    }

    // Load orders
    try {
      const allOrders = JSON.parse(
        localStorage.getItem("artmithra_orders") || "[]"
      );

      setOrders(
        allOrders.filter(
          (order) =>
            String(order.userId) ===
              String(currentUser.id ?? currentUser._id) ||
            order.userEmail === currentUser.email
        )
      );
    } catch {
      setOrders([]);
    }

    // Load wishlist
    try {
      const allWishlist = JSON.parse(
        localStorage.getItem("artmithra_wishlist") || "[]"
      );

      setWishlist(
        allWishlist.filter(
          (item) =>
            String(item.userId) ===
              String(currentUser.id ?? currentUser._id) ||
            item.userEmail === currentUser.email
        )
      );
    } catch {
      setWishlist([]);
    }

    // Load cart with fallback matching
    setCartItems(getUserCart(currentUser));
  };

  useEffect(() => {
    loadMySpace();

    window.addEventListener("cartUpdated", loadMySpace);
    window.addEventListener("storage", loadMySpace);

    return () => {
      window.removeEventListener("cartUpdated", loadMySpace);
      window.removeEventListener("storage", loadMySpace);
    };
  }, []);

  // Remove item from cart
  const removeFromCart = (artworkId) => {
    if (!user) return;

    const allCarts = JSON.parse(
      localStorage.getItem("artmithra_cart") || "{}"
    );

    const userId = String(user.id ?? user._id ?? "");
    const userEmail = user.email?.toLowerCase();

    const cartKey = user.id ?? user._id ?? user.email;
    const userCart = getUserCart(user);

    const updatedCart = userCart.filter(
      (item) => item.id !== artworkId
    );

    // Update the user's cart
    allCarts[cartKey] = updatedCart;

    localStorage.setItem(
      "artmithra_cart",
      JSON.stringify(allCarts)
    );

    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalAmount = orders.reduce(
    (total, order) =>
      total +
      Number(
        order.totalAmount ??
        order.total ??
        order.amount ??
        0
      ),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0),
    0
  );

  if (!user) {
    return (
      <div className="myspace-page">
        <h2>Please login to view My Space</h2>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="myspace-page">

      {/* HEADER */}
      <div className="myspace-header">
        <div>
          <p className="myspace-eyebrow">
            YOUR PERSONAL CORNER
          </p>
          <h1>My Space</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <Link to="/" className="myspace-back">
          <ArrowLeft size={18} /> Home
        </Link>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="myspace-cards">

        <div className="myspace-card">
          <ShoppingBag size={25} />
          <h2>{orders.length}</h2>
          <p>Orders Placed</p>
        </div>

        <div className="myspace-card">
          <Wallet size={25} />
          <h2>
            ₹{totalAmount.toLocaleString("en-IN")}
          </h2>
          <p>Total Amount</p>
        </div>

        <div className="myspace-card">
          <Heart size={25} />
          <h2>{wishlist.length}</h2>
          <p>Wishlist Items</p>
        </div>

        <div className="myspace-card">
          <ShoppingCart size={25} />
          <h2>{cartItems.length}</h2>
          <p>Cart Items</p>
        </div>

        <div className="myspace-card">
          <User size={25} />
          <h2>My Profile</h2>
          <p>{user.email}</p>
        </div>

      </div>

      {/* MY CART */}
      <section className="myspace-cart">

        <h2>
          <ShoppingCart size={22} /> My Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="myspace-empty">
            <ShoppingCart size={40} />
            <h3>Your cart is empty</h3>
            <p>
              Explore our gallery and add artworks you love.
            </p>
            <Link to="/gallery">
              Explore Gallery
            </Link>
          </div>
        ) : (
          <>
            <div className="myspace-cart-items">

              {cartItems.map((item) => (
                <div
                  className="myspace-cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="myspace-cart-details">
                    <p>{item.artist}</p>
                    <h3>{item.title}</h3>
                    <strong>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    className="myspace-remove-cart"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={17} />
                    Remove
                  </button>
                </div>
              ))}

            </div>

            <div className="myspace-cart-total">
              <h3>Cart Total</h3>
              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <Link
              to="/gallery"
              className="myspace-continue-shopping"
            >
              Continue Shopping
            </Link>
          </>
        )}

      </section>

      {/* RECENT ORDERS */}
      <section className="myspace-orders">

        <h2>
          <Package size={22} /> My Recent Orders
        </h2>

        {orders.length === 0 ? (
          <div className="myspace-empty">
            <ShoppingBag size={40} />
            <h3>No orders yet</h3>
            <p>
              Your purchased artworks will appear here.
            </p>
            <Link to="/gallery">
              Explore Gallery
            </Link>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              className="myspace-order"
              key={order.id || index}
            >
              <div>
                <h3>
                  Order #{order.id || index + 1}
                </h3>
                <p>
                  {order.date ||
                    order.createdAt ||
                    "Date unavailable"}
                </p>
                <p>
                  Status: {order.status || "Placed"}
                </p>
              </div>

              <strong>
                ₹{Number(
                  order.totalAmount ??
                  order.total ??
                  order.amount ??
                  0
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          ))
        )}

      </section>

    </div>
  );
}

export default MySpace;