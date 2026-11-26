
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import MySpace from "./pages/MySpace";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Artists from "./pages/Artists";
import Auctions from "./pages/Auctions";
import Exhibitions from "./pages/Exhibitions";
import Reviews from "./pages/Reviews";
import RemoveArtwork from "./pages/RemoveArtwork";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AddArtwork from "./pages/AddArtwork";
import AddArtist from "./pages/AddArtist";

function AdminRoute({ children }) {
  const admin = JSON.parse(
    localStorage.getItem("artmithra_currentUser") || "null"
  );

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();

  const hideNavbar = [
    "/login",
    "/signup",
    "/admin-dashboard",
    "/admin/add-artwork",
    "/admin/add-artist"
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/add-artwork" element={<AddArtwork />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path="/remove-artwork" element={<RemoveArtwork />} />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-artwork"
          element={
            <AdminRoute>
              <AddArtwork />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-artist"
          element={
            <AdminRoute>
              <AddArtist />
            </AdminRoute>
          }
        />
<Route path="/my-space" element={<MySpace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
