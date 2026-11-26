import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

import {
  LayoutDashboard,
  Palette,
  Users,
  ShoppingBag,
  CalendarDays,
  Image,
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Trash2
} from "lucide-react";

import "./Dashboard.css";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  const [stats, setStats] = useState({
    users: 0,
    artworks: 0,
    orders: 0,
    artists: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = JSON.parse(
      localStorage.getItem("artmithra_currentUser") || "null"
    );

    if (!savedAdmin || savedAdmin.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    setAdmin(savedAdmin);

    const readData = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "[]");
      } catch {
        return [];
      }
    };

    setStats({
      users: readData("artmithra_users").filter(
        (item) => item.role !== "admin"
      ).length,

      artworks: readData("artmithra_artworks").length,

      orders: readData("artmithra_orders").length,

      artists: readData("artmithra_artists").length
    });

  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("artmithra_currentUser");
    navigate("/login");
  };

  if (!admin) return null;

  const links = [
    {
      to: "/admin-dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard />
    },
    {
      to: "/gallery",
      label: "Artworks",
      icon: <Palette />
    },
    {
      to: "/add-artwork",
      label: "Add Artwork",
      icon: <Plus />
    },
    {
      to: "/remove-artwork",
      label: "Remove Artwork",
      icon: <Trash2 />
    },
    {
      to: "/artists",
      label: "Artists",
      icon: <Users />
    },
    {
      to: "/exhibitions",
      label: "Exhibitions",
      icon: <CalendarDays />
    },
    {
      to: "/auctions",
      label: "Auctions",
      icon: <Image />
    }
  ];

  const management = [
    {
      title: "Manage Artworks",
      description: "View and manage artwork collections.",
      link: "/gallery",
      icon: <Palette />
    },
    {
      title: "Add New Artwork",
      description: "Upload new paintings and add them to your gallery.",
      link: "/add-artwork",
      icon: <Plus />
    },
    {
      title: "Remove Artwork",
      description: "Remove unwanted paintings from your gallery.",
      link: "/remove-artwork",
      icon: <Trash2 />
    },
    {
      title: "Manage Artists",
      description: "Explore and manage artist profiles.",
      link: "/artists",
      icon: <Users />
    },
    {
      title: "Manage Exhibitions",
      description: "View and organize art exhibitions.",
      link: "/exhibitions",
      icon: <CalendarDays />
    },
    {
      title: "Manage Auctions",
      description: "View ongoing art auctions.",
      link: "/auctions",
      icon: <ShoppingBag />
    }
  ];

  return (
    <div className="portal-layout">

      {/* Sidebar */}
      <aside className="portal-sidebar">

        <Link to="/" className="portal-logo">
          <Palette size={27} />
          <span>ARTMITHRA</span>
        </Link>

        <p className="sidebar-caption">
          ADMINISTRATION
        </p>

        {links.map((item) => (
          <Link
            to={item.to}
            key={item.label}
            className={`portal-nav ${
              item.label === "Dashboard" ? "selected" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar admin-avatar">
              <ShieldCheck />
            </div>

            <div>
              <strong>ARTMITHRA Admin</strong>
              <span>Administrator</span>
            </div>

          </div>

          <button
            className="portal-logout"
            onClick={logout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Dashboard */}
      <main className="portal-main">

        <header className="portal-topbar">

          <div>
            <p>ARTMITHRA / ADMIN PANEL</p>
            <h2>Administration Dashboard</h2>
          </div>

          <div className="portal-profile">

            <div className="user-avatar admin-avatar">
              <ShieldCheck />
            </div>

            <span>{admin.name}</span>

          </div>

        </header>

        {/* Welcome Banner */}
        <section className="admin-welcome-banner">

          <div>
            <span>ADMINISTRATION PORTAL</span>

            <h1>Welcome, Administrator!</h1>

            <p>
              Manage your art gallery, artworks, artists and exhibitions
              from one place.
            </p>

          </div>

          <ShieldCheck size={95} strokeWidth={1} />

        </section>

        {/* Statistics */}
        <section className="portal-section">

          <div className="portal-section-heading">

            <div>
              <span>GALLERY OVERVIEW</span>
              <h2>Your Gallery at a Glance</h2>
            </div>

          </div>

          <div className="admin-stat-grid">

            <div className="admin-stat-card">
              <div className="stat-icon">
                <Users />
              </div>

              <p>Registered Users</p>
              <h2>{stats.users}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon">
                <Palette />
              </div>

              <p>Total Artworks</p>
              <h2>{stats.artworks}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon">
                <ShoppingBag />
              </div>

              <p>Total Orders</p>
              <h2>{stats.orders}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon">
                <Image />
              </div>

              <p>Total Artists</p>
              <h2>{stats.artists}</h2>
            </div>

          </div>

        </section>

        {/* Management */}
        <section className="portal-section">

          <div className="portal-section-heading">

            <div>
              <span>MANAGEMENT</span>
              <h2>Manage Your Gallery</h2>
            </div>

          </div>

          <div className="portal-card-grid">

            {management.map((item) => (

              <Link
                to={item.link}
                className="portal-feature-card"
                key={item.title}
              >

                <div className="feature-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <span>
                  Open Section
                  <ArrowUpRight size={16} />
                </span>

              </Link>

            ))}

          </div>

        </section>

        {/* Admin Note */}
        <section className="portal-admin-note">

          <ShieldCheck size={25} />

          <div>
            <h3>Administrator Access</h3>

            <p>
              You are logged in with administrator privileges.
              Manage your gallery using the sections above.
            </p>
          </div>

        </section>

        <footer className="portal-footer">
          © 2026 ARTMITHRA · ADMINISTRATION PANEL
        </footer>

      </main>

    </div>
  );
}

export default AdminDashboard;