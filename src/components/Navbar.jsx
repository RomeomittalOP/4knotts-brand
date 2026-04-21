import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header style={mobile ? styles.headerMobile : styles.header}>
      {/* Brand */}
      <Link to="/" style={styles.brandLink} onClick={closeMenu}>
        <div style={styles.brand}>
          <img
            src={logo}
            alt="4 Knotts Logo"
            style={styles.logo}
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

      {/* Desktop Nav */}
      {!mobile && (
        <>
          <nav style={styles.nav}>
            <Link
              to="/"
              style={
                hovered === "home"
                  ? styles.linkHover
                  : styles.link
              }
              onMouseEnter={() => setHovered("home")}
              onMouseLeave={() => setHovered("")}
            >
              Home
            </Link>

            <Link
              to="/catalog"
              style={
                hovered === "catalog"
                  ? styles.linkHover
                  : styles.link
              }
              onMouseEnter={() => setHovered("catalog")}
              onMouseLeave={() => setHovered("")}
            >
              Catalog
            </Link>

            <Link
              to="/wholesale"
              style={
                hovered === "wholesale"
                  ? styles.linkHover
                  : styles.link
              }
              onMouseEnter={() => setHovered("wholesale")}
              onMouseLeave={() => setHovered("")}
            >
              Wholesale
            </Link>

            <Link
              to="/customization"
              style={
                hovered === "custom"
                  ? styles.linkHover
                  : styles.link
              }
              onMouseEnter={() => setHovered("custom")}
              onMouseLeave={() => setHovered("")}
            >
              Customization
            </Link>
          </nav>

          <Link to="/catalog" style={styles.btn}>
            Request Catalogue →
          </Link>
        </>
      )}

      {/* Mobile Nav */}
      {mobile && menuOpen && (
        <nav style={styles.mobileNav}>
          <Link
            to="/"
            style={styles.mobileLink}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/catalog"
            style={styles.mobileLink}
            onClick={closeMenu}
          >
            Catalog
          </Link>

          <Link
            to="/wholesale"
            style={styles.mobileLink}
            onClick={closeMenu}
          >
            Wholesale
          </Link>

          <Link
            to="/customization"
            style={styles.mobileLink}
            onClick={closeMenu}
          >
            Customization
          </Link>

          <Link
            to="/catalog"
            style={styles.mobileBtn}
            onClick={closeMenu}
          >
            Request Catalogue
          </Link>
        </nav>
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
    padding: "18px 60px",
    background: "rgba(2,4,11,0.88)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    boxSizing: "border-box"
  },

  headerMobile: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "rgba(2,4,11,0.92)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    boxSizing: "border-box"
  },

  brandLink: {
    textDecoration: "none"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    animation: "logoFlip 10s ease-in-out infinite",
    boxShadow: "0 0 18px rgba(95,126,255,.18)"
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
    gap: "28px",
    alignItems: "center"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    letterSpacing: "1px",
    transition: "all .3s ease"
  },

  linkHover: {
    color: "#6f8fff",
    textDecoration: "none",
    fontSize: "14px",
    letterSpacing: "1px",
    transform: "translateY(-2px)",
    transition: "all .3s ease"
  },

  btn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "11px 18px",
    fontSize: "12px",
    borderRadius: "6px",
    letterSpacing: "1px",
    whiteSpace: "nowrap"
  },

  mobileNav: {
    position: "absolute",
    top: "78px",
    left: 0,
    width: "100%",
    background: "rgba(2,4,11,0.96)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    padding: "24px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    zIndex: 999,
    boxSizing: "border-box"
  },

  mobileLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px"
  },

  mobileBtn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "12px 16px",
    fontSize: "13px",
    textAlign: "center",
    borderRadius: "6px",
    marginTop: "8px"
  },

  menuBtn: {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "34px",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default Navbar;