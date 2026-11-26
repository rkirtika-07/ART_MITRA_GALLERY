
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, User, ShieldCheck, Palette
} from "lucide-react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (loginType === "admin") {
      if (
        cleanEmail === "admin@artmithra.demo" &&
        password === "Admin@123"
      ) {
        const adminUser = {
          id: "admin-1",
          name: "ARTMITHRA Admin",
          email: cleanEmail,
          role: "admin"
        };

        localStorage.setItem(
          "artmithra_currentUser",
          JSON.stringify(adminUser)
        );

        navigate("/admin-dashboard");
        return;
      }

      alert("Invalid admin email or password!");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("artmithra_users") || "[]"
    );

    const user = users.find(
      (item) =>
        item.email?.trim().toLowerCase() === cleanEmail &&
        item.password === password &&
        item.role === "user"
    );

    if (user) {
      localStorage.setItem(
        "artmithra_currentUser",
        JSON.stringify(user)
      );
      navigate("/user-dashboard");
    } else {
      alert("Invalid email or password. Please sign up first.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <div className="auth-visual">
          <div className="auth-brand">
            <Palette size={27} />
            <span>ARTMITHRA</span>
          </div>

          <div className="auth-visual-content">
            <p>WHERE ART MEETS SOUL</p>
            <h1>Discover the beauty of creativity.</h1>
            <span>
              Explore extraordinary artworks and connect with
              talented artists from around the world.
            </span>
          </div>

          <div className="auth-visual-bottom">
            A world of art, waiting to be discovered.
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">

            <div className="auth-heading">
              <span className="auth-eyebrow">WELCOME TO ARTMITHRA</span>
              <h2>Welcome Back!</h2>
              <p>Sign in to continue your artistic journey.</p>
            </div>

            <div className="login-type-selection">
              <button
                type="button"
                className={loginType === "user" ? "login-type active" : "login-type"}
                onClick={() => setLoginType("user")}
              >
                <User size={18} /> User
              </button>

              <button
                type="button"
                className={loginType === "admin" ? "login-type active" : "login-type"}
                onClick={() => setLoginType("admin")}
              >
                <ShieldCheck size={18} /> Admin
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>
              <div className="auth-input">
                <Mail size={19} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label>Password</label>
              <div className="auth-input">
                <Lock size={19} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <button type="submit" className="auth-submit">
                {loginType === "admin" ? "Login as Admin" : "Login to Account"}
              </button>
            </form>

            {loginType === "user" ? (
              <p className="auth-switch">
                Don't have an account?
                <Link to="/signup"> Create Account</Link>
              </p>
            ) : (
              <div className="admin-demo-info">
                <ShieldCheck size={18} />
                <div>
                  <strong>Demo Admin Access</strong>
                  <p>admin@artmithra.demo</p>
                  <p>Admin@123</p>
                </div>
              </div>
            )}

            <Link to="/" className="back-home-link">
              ← Back to Home
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
