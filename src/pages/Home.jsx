import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Legacy from "../components/Legacy";
import Wholesale from "../components/Wholesale";
import ProductShowcase from "../components/ProductShowcase";
import BrandStatement from "../components/BrandStatement";
import Reveal from "../components/Reveal";
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
      {/* WHITE */}
<section style={styles.whiteSection}>
  <Reveal style={styles.container}>
    <p style={styles.tagGold}>THE HYPE IS REAL</p>

    <h2 style={styles.headingWhite}>
      Brands That Get It, Get Us
    </h2>

    <p style={styles.descWhite}>
      Premium quality, quick delivery, and branding that
      lives rent-free in everyone's head.
    </p>
  </Reveal>
</section>
      <Legacy />

      {/* WHITE SECTION */}
      <section style={styles.whiteSection}>
        <Reveal style={styles.container}>
          <p style={styles.tagGold}>BULK MODE</p>

          <h2 style={styles.headingWhite}>
            Order Big. Flex Bigger.
          </h2>

          <p style={styles.descWhite}>
            Schools, offices and businesses that don't do
            basic — they stock up with us.
          </p>
        </Reveal>
      </section>

      <Wholesale />

      <BrandStatement />

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
    color: "#c7d0e6",
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