import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import logo from "../assets/logo-cutout.png";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const count = cart.reduce((n, i) => n + (i.qty || 1), 0);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header>
      <div className="wrap nav">
        <Link className="nav-logo" to="/" aria-label="Noted by 4 Knotts — home">
          <img className="lmark" src={logo} alt="" />
          <span className="nav-brandtext">
            <b>Noted</b>
            <small>by 4 Knotts</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link to="/catalog">Catalog</Link>
          <Link to="/customization">Customization</Link>
          <Link to="/wholesale">Wholesale</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </nav>

        <div className="nav-icons">
          <Link to="/cart" aria-label="Bag">
            🛍 {count > 0 ? count : ""}
          </Link>
          {!user ? (
            <Link to="/login" aria-label="Login">Login</Link>
          ) : (
            <a onClick={logout} aria-label="Logout">Logout</a>
          )}
          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div style={styles.mobile}>
          <Link to="/catalog" onClick={() => setOpen(false)} style={styles.mlink}>Catalog</Link>
          <Link to="/customization" onClick={() => setOpen(false)} style={styles.mlink}>Customization</Link>
          <Link to="/wholesale" onClick={() => setOpen(false)} style={styles.mlink}>Wholesale</Link>
          <Link to="/cart" onClick={() => setOpen(false)} style={styles.mlink}>Cart ({count})</Link>
          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)} style={styles.mlink}>Login</Link>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} style={styles.mlink}>Dashboard</Link>
              <a onClick={() => { setOpen(false); logout(); }} style={styles.mlink}>Logout</a>
            </>
          )}
        </div>
      )}
    </header>
  );
}

const styles = {
  mobile: {
    borderTop: "1px solid rgba(0,0,0,.06)",
    background: "rgba(251,251,253,.96)",
    backdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "column",
    padding: "12px 26px 18px",
    gap: "4px",
  },
  mlink: {
    padding: "10px 0",
    color: "#221F1A",
    fontSize: "16px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0,0,0,.05)",
  },
};

export default Navbar;
