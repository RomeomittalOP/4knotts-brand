import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Legacy from "../components/Legacy";
import Wholesale from "../components/Wholesale";
import ProductShowcase from "../components/ProductShowcase";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Ticker />

      {/* WHITE SECTION */}
     
      <ProductShowcase />

      {/* DARK SECTION */}
      <section style={styles.darkSection}>
        <div style={styles.container}>
          <p style={styles.tagBlue}>WHY CHOOSE US</p>

          <h2 style={styles.headingDark}>
            Trusted By Smart Brands
          </h2>

          <p style={styles.descDark}>
            Premium quality, fast delivery and memorable
            custom branding solutions across India.
          </p>
        </div>
      </section>

      <Legacy />

      {/* WHITE SECTION */}
      <section style={styles.whiteSection}>
        <div style={styles.container}>
          <p style={styles.tagGold}>WHOLESALE</p>

          <h2 style={styles.headingWhite}>
            Bulk Orders. Premium Results.
          </h2>

          <p style={styles.descWhite}>
            Trusted by schools, offices, institutions and
            serious businesses nationwide.
          </p>
        </div>
      </section>

      <Wholesale />

      {/* ALWAYS LAST */}
      <Footer />
    </>
  );
}

const styles = {
  darkSection: {
    padding: "120px 30px",
    background:
      "linear-gradient(135deg,#02040b,#061226,#02040b)",
    textAlign: "center"
  },

  whiteSection: {
    padding: "120px 30px",
    background:
      "linear-gradient(135deg,#ffffff,#f8f6ef,#ece7dc)",
    textAlign: "center"
  },

  container: {
    maxWidth: "950px",
    margin: "0 auto"
  },

  tagBlue: {
    color: "#7da4ff",
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "16px"
  },

  tagGold: {
    color: "#c79c22",
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "16px"
  },

  headingDark: {
    color: "white",
    fontSize: "64px",
    marginBottom: "18px",
    fontFamily: "Cormorant Garamond"
  },

  headingWhite: {
    color: "#111",
    fontSize: "64px",
    marginBottom: "18px",
    fontFamily: "Cormorant Garamond"
  },

  descDark: {
    color: "#c7d0e6",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "720px",
    margin: "0 auto"
  },

  descWhite: {
    color: "#444",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "720px",
    margin: "0 auto"
  }
};

export default Home;