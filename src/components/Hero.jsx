import heroImage from "../assets/products/hero.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const x =
      (e.clientX / window.innerWidth - 0.5) * 30;
    const y =
      (e.clientY / window.innerHeight - 0.5) * 30;

    setMouse({ x, y });
  };

  return (
    <section
      style={styles.hero}
      onMouseMove={handleMove}
    >
      {/* BACKGROUND GLOW */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* PARTICLES */}
      <div style={styles.p1}></div>
      <div style={styles.p2}></div>
      <div style={styles.p3}></div>

      {/* LEFT SIDE */}
      <motion.div
        style={{
          ...styles.left,
          transform: `translate(${mouse.x * 0.4}px,${
            mouse.y * 0.4
          }px)`
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p style={styles.tag}>
          DELHI • PREMIUM STATIONERY • SINCE
          2026
        </p>

        <h1 style={styles.heading}>
          Stationery
          <br />
          <span style={styles.gold}>
            for life.
          </span>
        </h1>

        <p style={styles.desc}>
          Premium notebooks, executive
          collections, A4 designs and office
          essentials crafted for schools,
          corporates and serious brands.
        </p>

        <div style={styles.btnWrap}>
          <Link
            to="/catalog"
            style={styles.goldBtn}
          >
            Explore Catalog
          </Link>

          <Link
            to="/wholesale"
            style={styles.darkBtn}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        style={{
          ...styles.right,
          transform: `translate(${-mouse.x *
            0.6}px,${-mouse.y * 0.6}px)`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* BACK CARD */}
        <div style={styles.layer1}></div>
        <div style={styles.layer2}></div>

        {/* MAIN CARD */}
        <motion.div
          style={styles.card}
          animate={{
            rotateY: [0, -10, 0],
            rotateX: [0, 5, 0],
            y: [0, -12, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity
          }}
          whileHover={{
            scale: 1.05,
            rotateY: -18
          }}
        >
          <img
            src={heroImage}
            alt="Hero"
            style={styles.image}
          />

          <div style={styles.shine}></div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    padding: "90px 60px",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg,#061226,#08182f,#02040b)"
  },

  glow1: {
    position: "absolute",
    top: "-180px",
    left: "-180px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(255,215,0,.18),transparent 70%)",
    filter: "blur(50px)"
  },

  glow2: {
    position: "absolute",
    right: "-180px",
    bottom: "-180px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(92,138,255,.18),transparent 70%)",
    filter: "blur(50px)"
  },

  p1: particle("18%", "10%"),
  p2: particle("65%", "14%"),
  p3: particle("28%", "74%"),

  left: {
    position: "relative",
    zIndex: 5
  },

  tag: {
    color: "#7da4ff",
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "22px"
  },

  heading: {
    color: "white",
    fontSize: "112px",
    lineHeight: ".88",
    fontFamily: "Cormorant Garamond",
    fontWeight: "600",
    marginBottom: "28px"
  },

  gold: {
    color: "#d4af37",
    fontStyle: "italic"
  },

  desc: {
    color: "#d8deef",
    fontSize: "22px",
    lineHeight: "1.8",
    maxWidth: "700px",
    marginBottom: "36px"
  },

  btnWrap: {
    display: "flex",
    gap: "18px"
  },

  goldBtn: {
    padding: "16px 34px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg,#d4af37,#b99118)",
    color: "#111",
    fontWeight: "700",
    textDecoration: "none"
  },

  darkBtn: {
    padding: "16px 34px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.15)",
    color: "white",
    textDecoration: "none"
  },

  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center"
  },

  layer1: {
    position: "absolute",
    width: "470px",
    height: "560px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.04)",
    transform: "rotate(-8deg) translateX(-40px)",
    filter: "blur(1px)"
  },

  layer2: {
    position: "absolute",
    width: "470px",
    height: "560px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.06)",
    transform: "rotate(8deg) translateX(40px)"
  },

  card: {
    position: "relative",
    width: "500px",
    height: "590px",
    borderRadius: "28px",
    overflow: "hidden",
    background:
      "linear-gradient(135deg,#0f2146,#08152d)",
    boxShadow:
      "0 30px 70px rgba(0,0,0,.45)"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  shine: {
    position: "absolute",
    top: 0,
    left: "-50%",
    width: "40%",
    height: "100%",
    background:
      "linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)",
    transform: "skewX(-25deg)"
  }
};

function particle(top, left) {
  return {
    position: "absolute",
    top,
    left,
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#d4af37",
    boxShadow:
      "0 0 18px rgba(212,175,55,.8)"
  };
}

export default Hero;