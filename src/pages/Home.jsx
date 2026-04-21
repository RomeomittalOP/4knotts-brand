// FILE: src/pages/Home.jsx
// FULL FILE REPLACE KAR DO
// Isme moving golden texture + animated reveal + premium section add ho jayega

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Legacy from "../components/Legacy";
import Wholesale from "../components/Wholesale";
import Footer from "../components/Footer";
import ProductShowcase from "../components/ProductShowcase";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* PREMIUM GOLDEN MOVING TEXTURE SECTION */}
      <section style={styles.goldSection}>
        <div style={styles.goldOverlay}></div>

        <div style={styles.content}>
          <p style={styles.tag}>4 KNOTTS LUXURY</p>

          <h2 style={styles.heading}>
            Crafted For Bigger Ideas
          </h2>

          <p style={styles.desc}>
            Premium stationery, notebooks and business
            essentials designed for brands that demand
            quality.
          </p>
        </div>
      </section>

      <Ticker />

      {/* PRODUCT CARDS */}
      <ProductShowcase />

      {/* MARBLE LUXURY SECTION */}
      <section style={styles.marble}>
        <div style={styles.marbleBox}>
          <p style={styles.tag}>PREMIUM QUALITY</p>

          <h2 style={styles.heading2}>
            Luxury In Every Detail
          </h2>

          <p style={styles.desc2}>
            Crafted with precision, packed with elegance
            and built to impress.
          </p>
        </div>
      </section>

      <Legacy />

      <Wholesale />

      <Footer />
    </>
  );
}

const styles = {
  goldSection: {
    position: "relative",
    padding: "120px 30px",
    background:
      "linear-gradient(135deg,#05070d,#0b1220,#05070d)",
    overflow: "hidden",
    textAlign: "center",
    color: "white"
  },

  goldOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, transparent 10%, rgba(255,215,120,.15) 40%, transparent 70%)",
    backgroundSize: "200% 100%",
    animation: "goldMove 6s linear infinite"
  },

  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    margin: "0 auto"
  },

  tag: {
    color: "#d4af37",
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "18px"
  },

  heading: {
    fontSize: "62px",
    marginBottom: "20px",
    fontFamily: "Cormorant Garamond",
    animation: "fadeUp 1.3s ease"
  },

  desc: {
    color: "#d1d1d1",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "760px",
    margin: "0 auto",
    animation: "fadeUp 1.8s ease"
  },

  marble: {
    padding: "110px 30px",
    background:
      "linear-gradient(135deg,#f4f4f4,#dcdcdc,#ffffff,#d9d9d9)",
    textAlign: "center"
  },

  marbleBox: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "70px 30px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,rgba(255,255,255,.7),rgba(240,240,240,.9))",
    boxShadow:
      "0 20px 60px rgba(0,0,0,.12)"
  },

  heading2: {
    fontSize: "54px",
    color: "#111",
    marginBottom: "18px",
    fontFamily: "Cormorant Garamond"
  },

  desc2: {
    color: "#444",
    fontSize: "18px",
    lineHeight: "1.8"
  }
};

export default Home;