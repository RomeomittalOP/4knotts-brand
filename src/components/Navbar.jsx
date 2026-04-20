import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header style={styles.header}>

      {/* Brand Click = Home */}
      <Link to="/" style={styles.brandLink}>
        <div style={styles.brand}>
          <img
            src={logo}
            alt="4 Knotts Logo"
            className="brand-logo"
          />

          <div>
            <h2 style={styles.title}>4 KNOTTS</h2>
            <p style={styles.sub}>STATIONERY</p>
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/catalog" style={styles.link}>
          Catalog
        </Link>

        <Link to="/wholesale" style={styles.link}>
          Wholesale & Contact
        </Link>

        <Link to="/customization" style={styles.link}>
          Customization
        </Link>
      </nav>

      {/* Button */}
      <Link to="/catalog" style={styles.btn}>
        Request Catalogue →
      </Link>

    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 60px",
    backgroundColor: "rgba(2,4,11,0.86)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    boxSizing: "border-box"
  },

  brandLink: {
    textDecoration: "none"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer"
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "600",
    fontFamily: "'Cinzel', serif",
    letterSpacing: "1px",
    lineHeight: "1"
  },

  sub: {
    margin: "4px 0 0 0",
    color: "#9ca3af",
    fontSize: "11px",
    letterSpacing: "4px",
    textTransform: "uppercase"
  },

  nav: {
    display: "flex",
    gap: "28px",
    alignItems: "center"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "13px",
    letterSpacing: "2px",
    whiteSpace: "nowrap"
  },

  btn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "12px 18px",
    fontSize: "12px",
    letterSpacing: "2px",
    whiteSpace: "nowrap"
  }
};

export default Navbar;