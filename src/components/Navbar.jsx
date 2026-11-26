
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserRound
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(
        localStorage.getItem("artmithra_currentUser")
      );
      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Artists", path: "/artists" },
    { name: "Auctions", path: "/auctions" },
    { name: "Exhibitions", path: "/exhibitions" },
    { name: "Reviews", path: "/reviews" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("artmithra_currentUser");

    setCurrentUser(null);
    setMenuOpen(false);

    alert("You have logged out successfully!");

    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(
        `/gallery?search=${encodeURIComponent(
          searchTerm.trim()
        )}`
      );

      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  const dashboardPath =
    currentUser?.role === "admin"
      ? "/admin-dashboard"
      : "/my-space";

  return (
    <header className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        ART<span>MITHRA</span>.
        <small>THE ART DESTINATION</small>
      </Link>

      {/* MOBILE MENU */}
      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* NAVIGATION LINKS */}
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>

        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}

        {/* MY SPACE - ONLY FOR NORMAL USERS */}
        {currentUser && currentUser.role !== "admin" && (
          <NavLink
            to="/my-space"
            onClick={() => setMenuOpen(false)}
          >
            My Space
          </NavLink>
        )}

      </nav>

      {/* RIGHT SIDE ACTIONS */}
      <div className="nav-actions">

        {/* SEARCH */}
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {searchOpen ? <X /> : <Search />}
        </button>

        {/* CART */}
        <button
          aria-label="Shopping bag"
          onClick={() => navigate("/cart")}
        >
          <ShoppingBag />
        </button>

        {/* LOGGED-IN USER */}
        {currentUser ? (

          <div className="user-menu">

            <Link
              to={dashboardPath}
              className="welcome-user"
            >
              <User size={19} />
              <span>Hi, {currentUser.name}!</span>
            </Link>

            {/* MY SPACE SHORTCUT */}
            {currentUser.role !== "admin" && (
              <Link
                to="/my-space"
                className="dashboard-link"
              >
                <UserRound size={17} />
                My Space
              </Link>
            )}

            {/* ADMIN DASHBOARD */}
            {currentUser.role === "admin" && (
              <Link
                to="/admin-dashboard"
                className="dashboard-link"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="logout-button"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="login-link"
            onClick={() => setMenuOpen(false)}
          >
            <User size={19} />
            Login
          </Link>

        )}

      </div>

      {/* SEARCH BAR */}
      {searchOpen && (

        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />

          <button type="submit">
            <Search size={18} />
          </button>

        </form>

      )}

    </header>
  );
}

export default Navbar;
