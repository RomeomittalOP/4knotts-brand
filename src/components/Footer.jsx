import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <section style={styles.wrap}>
        <div style={styles.paper}>
          {/* torn top */}
          <div style={styles.tornTop}></div>

          <div style={styles.icon}>📘 ✏️ 📄</div>

          <h2 style={styles.heading}>Want a Custom Design?</h2>

          <p style={styles.text}>
            Schools, colleges, corporates — we create a complete range of
            custom notebooks, planners, writing tools, business cards and
            letterheads, providing complete stationery branding identity
            with your logo, colors, and paper type.
          </p>

          <div style={styles.btnRow}>
            <Link to="/customization" style={styles.blueBtn}>
              START CUSTOMIZING
            </Link>

            <Link to="/wholesale" style={styles.outlineBtn}>
              WHOLESALE INQUIRY
            </Link>
          </div>

          {/* torn bottom */}
          <div style={styles.tornBottom}></div>
        </div>
      </section>

      <footer style={styles.footer}>
        © 2024 4 Knotts Stationery. All rights reserved.
      </footer>
    </>
  );
}

const styles = {
  wrap: {
    background: "#02040b",
    padding: "90px 20px 30px"
  },

  paper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "65px 70px",
    borderRadius: "18px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#f8f4e8",
    boxShadow: "0 25px 60px rgba(0,0,0,.35)",

    backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 38px,
        rgba(0,0,0,.08) 39px,
        transparent 40px
      )
    `
  },

  tornTop: {
    position: "absolute",
    top: "-18px",
    left: 0,
    width: "100%",
    height: "34px",
    background:
      "radial-gradient(circle at 12px 20px,#02040b 12px,transparent 13px) repeat-x",
    backgroundSize: "28px 34px"
  },

  tornBottom: {
    position: "absolute",
    bottom: "-18px",
    left: 0,
    width: "100%",
    height: "34px",
    background:
      "radial-gradient(circle at 12px 14px,#02040b 12px,transparent 13px) repeat-x",
    backgroundSize: "28px 34px"
  },

  icon: {
    fontSize: "38px",
    marginBottom: "10px"
  },

  heading: {
    fontSize: "68px",
    color: "#111",
    marginBottom: "18px",
    fontFamily: "Cormorant Garamond, serif",
    fontWeight: "600"
  },

  text: {
    maxWidth: "900px",
    margin: "0 auto",
    fontSize: "22px",
    lineHeight: "1.8",
    color: "#222"
  },

  btnRow: {
    marginTop: "36px",
    display: "flex",
    justifyContent: "center",
    gap: "22px",
    flexWrap: "wrap"
  },

  blueBtn: {
    textDecoration: "none",
    padding: "18px 36px",
    borderRadius: "40px",
    background: "#53b7ff",
    color: "#111",
    fontWeight: "700",
    border: "2px solid #53b7ff"
  },

  outlineBtn: {
    textDecoration: "none",
    padding: "18px 36px",
    borderRadius: "40px",
    border: "2px solid #222",
    color: "#111",
    fontWeight: "700"
  },

  footer: {
    background: "#02040b",
    color: "#7f889e",
    textAlign: "center",
    padding: "25px 15px",
    fontSize: "14px"
  }
};

export default Footer;