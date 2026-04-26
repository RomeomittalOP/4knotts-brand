import heroImage from "../assets/products/hero.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [mobile, setMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMouse({ x, y });
  };

  return (
    <section
      onMouseMove={handleMove}
      style={mobile ? styles.heroMobile : styles.hero}
    >
      {/* Glow */}
      <div style={mobile ? styles.glowMobile : styles.glow}></div>

      {/* Floating particles */}
      <div style={styles.p1}></div>
      <div style={styles.p2}></div>
      <div style={styles.p3}></div>

      {/* LEFT */}
      <motion.div
        style={{
          ...styles.left,
          transform: `translate(${mouse.x * 0.4}px,${
            mouse.y * 0.4
          }px)`
        }}
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p style={styles.tag}>
          DELHI • PREMIUM STATIONERY • SINCE 2026
        </p>

        <h1
          style={
            mobile
              ? styles.headingMobile
              : styles.heading
          }
        >
          Stationery
          <br />
          <span style={styles.life}>
            for life.
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
            Explore Catalog
          </Link>

          <Link
            to="/wholesale"
            style={styles.outlineBtn}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        style={{
          ...styles.right,
          transform: `translate(${-mouse.x * 0.7}px,${
            -mouse.y * 0.7
          }px)`
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div
          style={
            mobile
              ? styles.boxMobile
              : styles.box
          }
        ></div>

        <motion.img
          src={heroImage}
          alt="4 Knotts"
          style={
            mobile
              ? styles.imageMobile
              : styles.image
          }
          animate={{
            rotateY: [0, -8, 0],
            rotateX: [0, 4, 0],
            y: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
          whileHover={{
            rotateY: -15,
            scale: 1.05
          }}
        />
      </motion.div>
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
      "linear-gradient(135deg,#02040b,#07162f,#0d2a52,#02040b)",
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
      "linear-gradient(135deg,#02040b,#07162f,#0d2a52,#02040b)",
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
      "radial-gradient(circle, rgba(95,126,255,.35), transparent 65%)",
    filter: "blur(35px)"
  },

  glowMobile: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    top: "14%",
    right: "12%",
    background:
      "radial-gradient(circle, rgba(95,126,255,.35), transparent 65%)",
    filter: "blur(25px)"
  },

  p1: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#d4af37",
    animation: "floatHero 4s infinite"
  },

  p2: {
    position: "absolute",
    bottom: "18%",
    left: "20%",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#fff",
    animation: "floatHero 5s infinite"
  },

  p3: {
    position: "absolute",
    top: "28%",
    right: "25%",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#6f8fff",
    animation: "floatHero 6s infinite"
  },

  left: {
    zIndex: 2
  },

  tag: {
    color: "#6f8fff",
    letterSpacing: "3px",
    fontSize: "12px",
    marginBottom: "22px"
  },

  heading: {
    fontSize: "clamp(72px,9vw,130px)",
    lineHeight: ".92",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Cormorant Garamond"
  },

  headingMobile: {
    fontSize: "54px",
    lineHeight: "1",
    fontWeight: "700",
    fontFamily: "Cormorant Garamond"
  },

  life: {
    color: "#d4af37",
    fontStyle: "italic"
  },

  desc: {
    marginTop: "28px",
    maxWidth: "620px",
    color: "#b8b8b8",
    fontSize: "20px",
    lineHeight: "1.8"
  },

  descMobile: {
    marginTop: "22px",
    color: "#b8b8b8",
    fontSize: "15px",
    lineHeight: "1.8"
  },

  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "40px"
  },

  buttonsMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "28px",
    width: "100%"
  },

  primaryBtn: {
    background:
      "linear-gradient(135deg,#d4af37,#b99118)",
    color: "#111",
    padding: "16px 28px",
    borderRadius: "10px",
    fontWeight: "700"
  },

  outlineBtn: {
    border:
      "1px solid rgba(255,255,255,.18)",
    color: "white",
    padding: "16px 28px",
    borderRadius: "10px"
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
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#1c2948,#071120)",
    position: "absolute",
    boxShadow:
      "0 30px 80px rgba(0,0,0,.45)"
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
    filter:
      "drop-shadow(0 30px 40px rgba(0,0,0,.45))"
  },

  imageMobile: {
    width: "100%",
    maxWidth: "320px",
    position: "relative",
    zIndex: 2
  }
};

export default Hero;