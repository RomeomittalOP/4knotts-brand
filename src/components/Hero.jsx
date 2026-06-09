import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Mascot3D from "./Mascot3D";

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMouse({ x, y });
  };

  return (
    <section style={styles.hero} onMouseMove={handleMove}>
      {/* 🔥 BACKGROUND GLOW */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* 🔥 LEFT */}
      <motion.div
        style={{
          ...styles.left,
          transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.4}px)`
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p style={styles.tag}>
          ✦&nbsp;&nbsp;MADE IN INDIA&nbsp;&nbsp;•&nbsp;&nbsp;CERTIFIED ICONIC
        </p>

        <h1 style={styles.heading}>
          Some things are <br />
          worth <span style={styles.gold}>Noting.</span>
        </h1>

        <p style={styles.desc}>
          Luxury notebooks, diaries &amp; custom stationery on buttery{" "}
          <b style={styles.descHi}>100 GSM</b> paper — bold designs, clean
          finish, and a vibe that just hits different.
        </p>

        <div style={styles.btnWrap}>
          <Link to="/catalog" style={styles.goldBtn}>
            Shop the Drop&nbsp;→
          </Link>

          <Link to="/customization" style={styles.darkBtn}>
            Make It Yours
          </Link>
        </div>

        {/* trust chips */}
        <div style={styles.trustRow}>
          {["buttery 100 GSM", "25+ aesthetics", "ships pan-india"].map((t) => (
            <span key={t} style={styles.chip}>
              <span style={styles.dot} /> {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 🔥 RIGHT — interactive 3D mascot */}
      <motion.div
        style={styles.right}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Mascot3D />
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
    background: "linear-gradient(135deg,#061226,#08182f,#02040b)"
  },

  glow1: {
    position: "absolute",
    top: "-180px",
    left: "-180px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle,rgba(255,215,0,.18),transparent 70%)",
    filter: "blur(50px)"
  },

  glow2: {
    position: "absolute",
    right: "-180px",
    bottom: "-180px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle,rgba(92,138,255,.18),transparent 70%)",
    filter: "blur(50px)"
  },

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
    fontStyle: "italic",
    background:
      "linear-gradient(120deg,#f5d77a 10%,#d4af37 40%,#fff 50%,#d4af37 60%,#f5d77a 90%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    animation: "introShimmer 3s linear infinite"
  },

  desc: {
    color: "#d8deef",
    fontSize: "22px",
    lineHeight: "1.8",
    maxWidth: "640px",
    marginBottom: "32px"
  },

  descHi: {
    color: "#f0d585",
    fontWeight: 700
  },

  btnWrap: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap"
  },

  goldBtn: {
    padding: "16px 34px",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#f5d77a,#d4af37,#b99118)",
    color: "#111",
    fontWeight: "700",
    textDecoration: "none",
    boxShadow: "0 12px 30px rgba(212,175,55,.32)"
  },

  darkBtn: {
    padding: "16px 34px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.18)",
    color: "white",
    textDecoration: "none",
    backdropFilter: "blur(6px)"
  },

  trustRow: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
    marginTop: "30px"
  },

  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    color: "#c7d0e6",
    fontSize: "14px",
    letterSpacing: "0.5px"
  },

  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#f5d77a,#d4af37)",
    boxShadow: "0 0 8px rgba(212,175,55,.7)"
  },

  right: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "600px"
  }
};

export default Hero;