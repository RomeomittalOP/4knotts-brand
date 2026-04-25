import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      {/* TOP CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaHeading}>
          Ready to Build Your Brand?
        </h2>

        <p style={styles.ctaText}>
          Premium notebooks, custom printing and wholesale solutions.
        </p>

        <Link to="/customization" style={styles.ctaBtn}>
          Start Now →
        </Link>
      </section>

      {/* MAIN FOOTER */}
      <section style={styles.main}>
        <div style={styles.grid}>
          {/* LEFT */}
          <div>
            <h1 style={styles.logo}>
              4 Knotts Stationery
            </h1>

            <p style={styles.desc}>
              India's most premium notebook brand.
              Crafted for writers, dreamers and doers
              who believe the right notebook changes
              everything.
            </p>

            <div style={styles.icons}>
              <span style={styles.icon}>📷</span>
              <span style={styles.icon}>💼</span>
              <span style={styles.icon}>🛍️</span>
              <span style={styles.icon}>▶️</span>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 style={styles.head}>SHOP</h4>
            <p style={styles.link}>All Products</p>
            <p style={styles.link}>Spiral Notebooks</p>
            <p style={styles.link}>A4 Notebooks</p>
            <p style={styles.link}>A5 Notebooks</p>
            <p style={styles.link}>Executive Series</p>
          </div>

          {/* SERVICES */}
          <div>
            <h4 style={styles.head}>SERVICES</h4>
            <p style={styles.link}>Wholesale</p>
            <p style={styles.link}>Custom Branding</p>
            <p style={styles.link}>Corporate Gifting</p>
            <p style={styles.link}>Bulk Orders</p>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 style={styles.head}>SUPPORT</h4>
            <p style={styles.link}>Contact Us</p>
            <p style={styles.link}>Track Order</p>
            <p style={styles.link}>Return Policy</p>
            <p style={styles.link}>Privacy Policy</p>
            <p style={styles.link}>Terms of Service</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div style={styles.bottom}>
          © 2024 4 Knotts Stationery. All rights reserved. Made with ❤️ in India.
        </div>
      </section>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    marginTop: "0",
    background:
      "linear-gradient(135deg,#02040b,#061226,#02040b)",
    color: "white",
    position: "relative",
    zIndex: 2
  },

  /* CTA */
  cta: {
    textAlign: "center",
    padding: "90px 20px 70px",
    borderBottom: "1px solid rgba(255,255,255,.06)"
  },

  ctaHeading: {
    fontSize: "62px",
    fontFamily: "Cormorant Garamond",
    marginBottom: "14px",
    lineHeight: "1.1"
  },

  ctaText: {
    color: "#aab4cc",
    fontSize: "18px",
    marginBottom: "28px"
  },

  ctaBtn: {
    display: "inline-block",
    padding: "16px 34px",
    borderRadius: "40px",
    background:
      "linear-gradient(135deg,#5f7eff,#7da4ff)",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow:
      "0 10px 25px rgba(95,126,255,.25)"
  },

  /* MAIN */
  main: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "70px 40px 30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr 1fr",
    gap: "70px",
    alignItems: "start"
  },

  logo: {
    fontSize: "56px",
    fontFamily: "Cormorant Garamond",
    marginBottom: "24px",
    lineHeight: "1.1"
  },

  desc: {
    color: "#98a2bb",
    fontSize: "17px",
    lineHeight: "1.9",
    maxWidth: "420px",
    marginBottom: "26px"
  },

  icons: {
    display: "flex",
    gap: "14px"
  },

  icon: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.02)",
    cursor: "pointer",
    fontSize: "18px"
  },

  head: {
    color: "#7da4ff",
    letterSpacing: "3px",
    fontSize: "14px",
    marginBottom: "20px"
  },

  link: {
    color: "#d5def5",
    marginBottom: "14px",
    fontSize: "17px",
    cursor: "pointer"
  },

  bottom: {
    marginTop: "55px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255,255,255,.06)",
    textAlign: "center",
    color: "#7c859d",
    fontSize: "14px"
  },
  marginBottom: "0",
paddingBottom: "80px"
};

export default Footer;