
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Palette, ShoppingBag, Heart, User, LogOut,
  LayoutDashboard, Users, CalendarDays, ArrowUpRight
} from "lucide-react";
import "./Dashboard.css";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("artmithra_currentUser") || "null"
    );

    if (!savedUser || savedUser.role !== "user") {
      navigate("/login", { replace: true });
      return;
    }

    setUser(savedUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("artmithra_currentUser");
    navigate("/login");
  };

  if (!user) return null;

  const firstName = user.name?.split(" ")[0] || "Artist";

  const links = [
    { to: "/user-dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { to: "/gallery", icon: <Palette />, label: "Explore Gallery" },
    { to: "/artists", icon: <Users />, label: "Artists" },
    { to: "/exhibitions", icon: <CalendarDays />, label: "Exhibitions" },
    { to: "/cart", icon: <ShoppingBag />, label: "My Cart" },
    { to: "/wishlist", icon: <Heart />, label: "Wishlist" }
  ];

  return (
    <div className="portal-layout">

      <aside className="portal-sidebar">
        <Link to="/" className="portal-logo">
          <Palette size={27} />
          <span>ARTMITHRA</span>
        </Link>

        <p className="sidebar-caption">MAIN MENU</p>

        {links.map((item) => (
          <Link
            to={item.to}
            key={item.label}
            className={`portal-nav ${item.label === "Dashboard" ? "selected" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user.name}</strong>
              <span>Gallery Member</span>
            </div>
          </div>

          <button className="portal-logout" onClick={logout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="portal-main">
        <header className="portal-topbar">
          <div>
            <p>ARTMITHRA / USER PORTAL</p>
            <h2>My Dashboard</h2>
          </div>
          <div className="portal-profile">
            <div className="user-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <span>{user.name}</span>
          </div>
        </header>

        <section className="user-welcome-banner">
          <div>
            <span>YOUR CREATIVE SPACE</span>
            <h1>Welcome back, {firstName}!</h1>
            <p>
              Art is not what you see, but what you make others see.
              Discover something beautiful today.
            </p>
            <Link to="/gallery" className="portal-primary-btn">
              Explore Artworks <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="welcome-decoration">
            <Palette size={100} strokeWidth={1} />
          </div>
        </section>

        <section className="portal-section">
          <div className="portal-section-heading">
            <div>
              <span>DISCOVER MORE</span>
              <h2>Explore Your Art World</h2>
            </div>
          </div>

          <div className="portal-card-grid">
            <Link to="/gallery" className="portal-feature-card">
              <div className="feature-icon"><Palette /></div>
              <h3>Art Gallery</h3>
              <p>Explore beautiful paintings and creative artworks.</p>
              <span>Explore Gallery <ArrowUpRight size={16} /></span>
            </Link>

            <Link to="/artists" className="portal-feature-card">
              <div className="feature-icon"><Users /></div>
              <h3>Meet Artists</h3>
              <p>Discover talented artists and their creative journeys.</p>
              <span>Discover Artists <ArrowUpRight size={16} /></span>
            </Link>

            <Link to="/exhibitions" className="portal-feature-card">
              <div className="feature-icon"><CalendarDays /></div>
              <h3>Exhibitions</h3>
              <p>Explore art exhibitions and special collections.</p>
              <span>View Exhibitions <ArrowUpRight size={16} /></span>
            </Link>

            <Link to="/auctions" className="portal-feature-card">
              <div className="feature-icon"><ShoppingBag /></div>
              <h3>Art Auctions</h3>
              <p>Discover artworks available for auction.</p>
              <span>Explore Auctions <ArrowUpRight size={16} /></span>
            </Link>
          </div>
        </section>

        <section className="portal-bottom-grid">
          <div className="portal-info-card">
            <ShoppingBag size={27} />
            <h3>Your Shopping Cart</h3>
            <p>Keep your selected artworks together and continue shopping.</p>
            <Link to="/cart">View My Cart →</Link>
          </div>

          <div className="portal-info-card">
            <Heart size={27} />
            <h3>Your Wishlist</h3>
            <p>Save the artworks you love and revisit them anytime.</p>
            <Link to="/wishlist">View Wishlist →</Link>
          </div>

          <div className="portal-info-card">
            <User size={27} />
            <h3>My Account</h3>
            <p>{user.email}</p>
            <span>Registered Gallery Member</span>
          </div>
        </section>

        <footer className="portal-footer">
          © 2026 ARTMITHRA · A WORLD OF ART AND CREATIVITY
        </footer>
      </main>
    </div>
  );
}

export default UserDashboard;
