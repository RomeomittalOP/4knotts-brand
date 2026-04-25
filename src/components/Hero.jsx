import heroImage from "../assets/products/hero.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Hero() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section style={mobile ? styles.heroMobile : styles.hero}>
      {/* Animated Glow */}
      <div style={mobile ? styles.glowMobile : styles.glow}></div>

      {/* LEFT SIDE */}
      <div style={styles.left}>
        <p style={styles.tag}>
          DELHI • PREMIUM STATIONERY • SINCE 2026
        </p>

       <h1 style={styles.heading}>
  Stationery
  <br />
  <span style={styles.life}>for life.</span>
          <span style={styles.blueGlow}>
            
          </span>

        </h1>

        <p style={mobile ? styles.descMobile : styles.desc}>
          Premium notebooks, executive collections,
          A4 designs and office essentials crafted
          for schools, corporates and serious brands.
        </p>

        <div
          style={
            mobile
              ? styles.buttonsMobile
              : styles.buttons
          }
        >
          <Link to="/catalog" style={styles.primaryBtn}>
            TEST BUTTON
          </Link>

          <Link to="/wholesale" style={styles.outlineBtn}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div
          style={
            mobile ? styles.boxMobile : styles.box
          }
        ></div>

        <img
          src={heroImage}
          alt="4 Knotts"
          style={
            mobile
              ? styles.imageMobile
              : styles.image
          }
        />
      </div>
    </section>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1.1fr .9fr",
    alignItems: "center",
    gap: "40px",
    padding: "130px 60px 60px",
    background:
      "linear-gradient(-45deg,#02040b,#07162f,#0d2a52,#02040b)",
    backgroundSize: "400% 400%",
    animation: "heroWave 10s ease infinite",
    color: "white",
    overflow: "hidden",
    position: "relative"
  },

  heroMobile: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    padding: "120px 22px 50px",
    background:
      "linear-gradient(-45deg,#02040b,#07162f,#0d2a52,#02040b)",
    backgroundSize: "400% 400%",
    animation: "heroWave 10s ease infinite",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    position: "relative"
  },

  glow: {
    position: "absolute",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    top: "10%",
    right: "8%",
    background:
      "radial-gradient(circle, rgba(95,126,255,.30), transparent 65%)",
    filter: "blur(35px)",
    animation: "floatGlow 6s ease-in-out infinite"
  },

  glowMobile: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    top: "14%",
    right: "12%",
    background:
      "radial-gradient(circle, rgba(95,126,255,.30), transparent 65%)",
    filter: "blur(25px)",
    animation: "floatGlow 6s ease-in-out infinite"
  },

  left: {
    position: "relative",
    zIndex: 2
  },

  tag: {
    color: "#6f8fff",
    letterSpacing: "3px",
    fontSize: "12px",
    marginBottom: "22px",
    animation: "fadeUp 1s ease"
  },

  heading: {
    fontSize: "clamp(70px, 9vw, 130px)",
    lineHeight: ".95",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Inter, sans-serif",
    animation: "fadeUp 1.2s ease"
  },

  headingMobile: {
    fontSize: "54px",
    lineHeight: "1",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Inter, sans-serif",
    animation: "fadeUp 1.2s ease"
  },

  blueGlow: {
    color: "#8db0ff",
    textShadow:
      "0 0 25px rgba(111,143,255,.45)"
  },

  desc: {
    marginTop: "28px",
    maxWidth: "620px",
    color: "#b8b8b8",
    fontSize: "20px",
    lineHeight: "1.8",
    animation: "fadeUp 1.6s ease"
  },

  descMobile: {
    marginTop: "22px",
    color: "#b8b8b8",
    fontSize: "15px",
    lineHeight: "1.8",
    animation: "fadeUp 1.6s ease"
  },

  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "40px",
    animation: "fadeUp 2s ease"
  },

  buttonsMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "28px",
    width: "100%",
    animation: "fadeUp 2s ease"
  },

  primaryBtn: {
    background:
      "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    textDecoration: "none",
    padding: "16px 28px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow:
      "0 12px 28px rgba(95,126,255,.28)"
  },

  outlineBtn: {
    border:
      "1px solid rgba(255,255,255,.18)",
    color: "white",
    textDecoration: "none",
    padding: "16px 28px",
    borderRadius: "8px",
    textAlign: "center",
    backdropFilter: "blur(8px)"
  },

  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },

  box: {
    width: "520px",
    height: "520px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#1c2948,#071120)",
    boxShadow:
      "0 25px 70px rgba(0,0,0,.40)",
    position: "absolute"
  },

  boxMobile: {
    width: "280px",
    height: "280px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#1c2948,#071120)",
    position: "absolute"
  },

  image: {
    width: "100%",
    maxWidth: "620px",
    position: "relative",
    zIndex: 2,
    objectFit: "contain",
    transform:
      "perspective(1200px) rotateY(-10deg)",
    filter:
      "drop-shadow(0 30px 40px rgba(0,0,0,.45))",
    animation: "floatHero 4s ease-in-out infinite"
  },

  imageMobile: {
    width: "100%",
    maxWidth: "320px",
    position: "relative",
    zIndex: 2,
    objectFit: "contain",
    animation: "floatHero 4s ease-in-out infinite"
  }
};

export default Hero;