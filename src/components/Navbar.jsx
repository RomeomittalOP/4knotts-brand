import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header style={styles.header}>
      {/* Brand */}
      <Link to="/" style={styles.brandLink}>
        <div style={styles.brand}>
          <img
            src={logo}
            alt="4 Knotts Logo"
            className="brand-logo"
          />

          <div>
            <h2 style={mobile ? styles.titleMobile : styles.title}>
              4 KNOTTS
            </h2>

            <p style={styles.sub}>STATIONERY</p>
          </div>
        </div>
      </Link>

      {/* Mobile Menu Button */}
      {mobile && (
        <button
          style={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* Nav */}
      {(!mobile || menuOpen) && (
        <nav style={mobile ? styles.mobileNav : styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>

          <Link to="/catalog" style={styles.link}>
            Catalog
          </Link>

          <Link to="/wholesale" style={styles.link}>
            Wholesale
          </Link>

          <Link to="/customization" style={styles.link}>
            Customization
          </Link>

          <Link to="/catalog" style={styles.mobileBtn}>
            Request Catalogue
          </Link>
        </nav>
      )}

      {/* Desktop Button */}
      {!mobile && (
        <Link to="/catalog" style={styles.btn}>
          Request Catalogue →
        </Link>
      )}
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
    padding: "16px 20px",
    backgroundColor: "rgba(2,4,11,0.92)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    boxSizing: "border-box",
    flexWrap: "wrap"
  },

  brandLink: {
    textDecoration: "none"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer"
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: "30px",
    fontWeight: "600",
    fontFamily: "'Cinzel', serif",
    lineHeight: "1"
  },

  titleMobile: {
    margin: 0,
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "600",
    fontFamily: "'Cinzel', serif",
    lineHeight: "1"
  },

  sub: {
    margin: "4px 0 0 0",
    color: "#9ca3af",
    fontSize: "10px",
    letterSpacing: "3px"
  },

  nav: {
    display: "flex",
    gap: "24px",
    alignItems: "center"
  },

  mobileNav: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "18px",
    paddingBottom: "10px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    letterSpacing: "1px"
  },

  btn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "10px 16px",
    fontSize: "12px",
    letterSpacing: "1px",
    whiteSpace: "nowrap"
  },

  mobileBtn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "10px 16px",
    fontSize: "12px",
    textAlign: "center"
  },

  menuBtn: {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "28px",
    cursor: "pointer"
  }
};

export default Navbar;