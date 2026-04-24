// FILE: src/components/Navbar.jsx
// FULL FILE REPLACE KAR DO
// ✅ User login ke baad Gmail DP show hogi
// ✅ Click = Dashboard
// ✅ Logout
// ✅ Existing Home screen same rahegi

import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [mobile, setMobile] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreen = () => {
      setMobile(
        window.innerWidth <= 768
      );
    };

    checkScreen();

    window.addEventListener(
      "resize",
      checkScreen
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkScreen
      );
  }, []);

  const logoutUser = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header
      style={
        mobile
          ? styles.headerMobile
          : styles.header
      }
    >
      {/* LEFT */}
      <Link
        to="/"
        style={styles.brandLink}
      >
        <div style={styles.brand}>
          <img
            src={logo}
            alt="logo"
            style={styles.logo}
          />

          <div>
            <h2 style={styles.title}>
              4 KNOTTS
            </h2>

            <p style={styles.sub}>
              STATIONERY
            </p>
          </div>
        </div>
      </Link>

      {/* RIGHT */}
      {!mobile && (
        <div style={styles.right}>
          <nav style={styles.nav}>
            <Link
              to="/"
              style={styles.link}
            >
              Home
            </Link>

            <Link
              to="/catalog"
              style={styles.link}
            >
              Catalog
            </Link>

            <Link
              to="/wholesale"
              style={styles.link}
            >
              Wholesale
            </Link>

            <Link
              to="/customization"
              style={styles.link}
            >
              Customization
            </Link>
          </nav>

          {!user ? (
            <div style={styles.authBtns}>
              <Link
                to="/login"
                style={styles.outlineBtn}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={styles.btn}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div style={styles.userBox}>
              <Link to="/dashboard">
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=" +
                      user.email
                  }
                  alt="dp"
                  style={styles.dp}
                />
              </Link>

              <button
                onClick={logoutUser}
                style={styles.btn}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* MOBILE */}
      {mobile && (
        <button
          style={styles.menuBtn}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      )}

      {mobile && menuOpen && (
        <div style={styles.mobileNav}>
          <Link
            to="/"
            style={styles.mobileLink}
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                style={styles.mobileBtn}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={styles.mobileBtn}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={styles.mobileBtn}
              >
                Dashboard
              </Link>

              <button
                onClick={logoutUser}
                style={styles.mobileBtn}
              >
                Logout
              </button>
            </>
          )}
        </div>
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
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "18px 60px",
    background:
      "rgba(2,4,11,.88)",
    backdropFilter:
      "blur(14px)"
  },

  headerMobile: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background:
      "rgba(2,4,11,.92)"
  },

  brandLink: {
    textDecoration: "none"
  },

  brand: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },

  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "12px"
  },

  title: {
    margin: 0,
    color: "white"
  },

  sub: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "10px",
    letterSpacing: "3px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "26px"
  },

  nav: {
    display: "flex",
    gap: "22px"
  },

  link: {
    color: "white",
    textDecoration: "none"
  },

  authBtns: {
    display: "flex",
    gap: "12px"
  },

  userBox: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },

  dp: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    objectFit: "cover",
    border:
      "2px solid #6f8fff"
  },

  btn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background:
      "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    cursor: "pointer"
  },

  outlineBtn: {
    padding: "10px 16px",
    border:
      "1px solid rgba(255,255,255,.15)",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none"
  },

  menuBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "28px"
  },

  mobileNav: {
    position: "absolute",
    top: "78px",
    left: 0,
    width: "100%",
    background:
      "rgba(2,4,11,.97)",
    display: "flex",
    flexDirection:
      "column",
    gap: "14px",
    padding: "24px"
  },

  mobileLink: {
    color: "white",
    textDecoration: "none"
  },

  mobileBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background:
      "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    textDecoration: "none"
  }
};

export default Navbar;