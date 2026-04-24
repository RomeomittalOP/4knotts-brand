import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <div style={styles.icon}>📘</div>

          <h2 style={styles.heading}>
            Want a Custom Design?
          </h2>

          <p style={styles.desc}>
            Schools, colleges, corporates — we create
            custom notebooks with your logo, colours,
            paper type and complete branding identity.
          </p>

          <div style={styles.btnWrap}>
            <Link
              to="/customization"
              style={styles.primaryBtn}
            >
              START CUSTOMIZING
            </Link>

            <Link
              to="/wholesale"
              style={styles.outlineBtn}
            >
              WHOLESALE INQUIRY
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          {/* Column 1 */}
          <div style={styles.col}>
            <h2 style={styles.logo}>
              4 Knotts Stationery
            </h2>

            <p style={styles.text}>
              India's most premium notebook brand.
              Crafted for writers, dreamers and doers
              who believe the right notebook changes
              everything.
            </p>

            <div style={styles.socialWrap}>
              <span style={styles.social}>📷</span>
              <span style={styles.social}>💼</span>
              <span style={styles.social}>🛍️</span>
              <span style={styles.social}>▶️</span>
            </div>
          </div>

          {/* Column 2 */}
          <div style={styles.col}>
            <h4 style={styles.title}>SHOP</h4>

            <p style={styles.link}>All Products</p>
            <p style={styles.link}>Spiral Notebooks</p>
            <p style={styles.link}>A4 Notebooks</p>
            <p style={styles.link}>A5 Notebooks</p>
            <p style={styles.link}>Executive Series</p>
          </div>

          {/* Column 3 */}
          <div style={styles.col}>
            <h4 style={styles.title}>SERVICES</h4>

            <p style={styles.link}>Wholesale</p>
            <p style={styles.link}>Custom Branding</p>
            <p style={styles.link}>Corporate Gifting</p>
            <p style={styles.link}>Bulk Orders</p>
          </div>

          {/* Column 4 */}
          <div style={styles.col}>
            <h4 style={styles.title}>SUPPORT</h4>

            <p style={styles.link}>Contact Us</p>
            <p style={styles.link}>Track Order</p>
            <p style={styles.link}>Return Policy</p>
            <p style={styles.link}>Privacy Policy</p>
            <p style={styles.link}>Terms of Service</p>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.bottomLine}></div>

        {/* Copyright */}
        <div style={styles.bottomBar}>
          © 2024 4 Knotts Stationery. All rights reserved.
          Made with ❤️ in India.
        </div>
      </footer>
    </>
  );
}

const styles = {
  /* CTA */
  ctaSection: {
    padding: "90px 20px 40px",
    background: "#02040b"
  },

  ctaBox: {
    maxWidth: "760px",
    margin: "auto",
    padding: "60px 30px",
    borderRadius: "28px",
    textAlign: "center",
    background:
      "linear-gradient(135deg,#0f1627,#06080f)",
    border: "1px solid rgba(111,143,255,.18)",
    boxShadow:
      "0 0 40px rgba(111,143,255,.08)"
  },

  icon: {
    fontSize: "34px",
    marginBottom: "18px"
  },

  heading: {
    color: "white",
    fontSize: "52px",
    fontFamily: "Cormorant Garamond",
    marginBottom: "14px"
  },

  desc: {
    color: "#b8b8b8",
    maxWidth: "620px",
    margin: "auto",
    lineHeight: "1.8",
    fontSize: "16px"
  },

  btnWrap: {
    marginTop: "34px",
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#6f8fff",
    color: "white",
    padding: "16px 28px",
    borderRadius: "40px",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow:
      "0 0 25px rgba(111,143,255,.25)"
  },

  outlineBtn: {
    border: "1px solid rgba(255,255,255,.12)",
    color: "white",
    padding: "16px 28px",
    borderRadius: "40px",
    textDecoration: "none"
  },

  /* Footer */
  footer: {
    background: "#02040b",
    padding: "80px 60px 35px",
    borderTop:
      "1px solid rgba(255,255,255,.05)"
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr 1fr",
    gap: "55px"
  },

  col: {
    color: "#9ea3b3",
    lineHeight: "2"
  },

  logo: {
    color: "white",
    marginBottom: "18px",
    fontSize: "42px",
    fontFamily: "Cormorant Garamond"
  },

  title: {
    color: "#6f8fff",
    marginBottom: "18px",
    letterSpacing: "3px",
    fontSize: "13px"
  },

  text: {
    maxWidth: "340px",
    lineHeight: "1.9"
  },

  link: {
    cursor: "pointer",
    transition: "0.3s",
    margin: "8px 0"
  },

  socialWrap: {
    display: "flex",
    gap: "12px",
    marginTop: "26px"
  },

  social: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border:
      "1px solid rgba(255,255,255,.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },

  bottomLine: {
    marginTop: "55px",
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(to right, transparent, rgba(255,255,255,.08), transparent)"
  },

  bottomBar: {
    textAlign: "center",
    paddingTop: "26px",
    color: "#7f889e",
    fontSize: "14px",
    letterSpacing: "0.5px"
  }
};

export default Footer;