import heroImage from "../assets/products/hero.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Hero() {
  const [mobile, setMobile] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section style={mobile ? styles.heroMobile : styles.hero}>
      {/* LEFT */}
      <div style={styles.left}>
        <p style={styles.tag}>
          DELHI • PREMIUM STATIONERY • SINCE 2026
        </p>

        <h1 style={mobile ? styles.headingMobile : styles.heading}>
          Stationery <br />
          <span style={styles.blueGlow}>for life.</span>
        </h1>

        <p style={mobile ? styles.descMobile : styles.desc}>
          Premium spiral notebooks, executive collections,
          A4 designs and office essentials crafted for
          schools, corporates and serious brands.
        </p>

        <div style={mobile ? styles.buttonsMobile : styles.buttons}>
          <Link to="/catalog" style={styles.primaryBtn}>
            Explore Catalog
          </Link>

          <Link to="/wholesale" style={styles.outlineBtn}>
            Start Enquiry
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={mobile ? styles.glowMobile : styles.glow}></div>

        <img
          src={heroImage}
          alt="4 Knotts Mascot"
          style={
            mobile
              ? styles.imageMobile
              : hover
              ? styles.imageHover
              : styles.image
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
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
      "radial-gradient(circle at top right,#0d2a52 0%,#07111f 35%,#02060d 100%)",
    color: "white",
    overflow: "hidden"
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
      "radial-gradient(circle at top right,#0d2a52 0%,#07111f 35%,#02060d 100%)",
    color: "white",
    textAlign: "center",
    overflow: "hidden"
  },

  left: {
    width: "100%"
  },

  tag: {
    color: "#6f8fff",
    letterSpacing: "3px",
    fontSize: "12px",
    marginBottom: "22px"
  },

  heading: {
    fontSize: "clamp(62px, 9vw, 128px)",
    lineHeight: ".9",
    fontWeight: "300",
    margin: 0,
    fontFamily: "Cormorant Garamond"
  },

  headingMobile: {
    fontSize: "58px",
    lineHeight: "0.95",
    fontWeight: "300",
    margin: 0,
    fontFamily: "Cormorant Garamond"
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
    background: "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    textDecoration: "none",
    padding: "16px 26px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(95,126,255,.25)"
  },

  outlineBtn: {
    border: "1px solid rgba(255,255,255,.18)",
    color: "white",
    textDecoration: "none",
    padding: "16px 26px",
    borderRadius: "8px",
    textAlign: "center",
    backdropFilter: "blur(8px)"
  },

  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  glow: {
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    position: "absolute",
    background:
      "radial-gradient(circle, rgba(80,130,255,.25), transparent 65%)",
    filter: "blur(25px)"
  },

  glowMobile: {
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    position: "absolute",
    background:
      "radial-gradient(circle, rgba(80,130,255,.25), transparent 65%)",
    filter: "blur(25px)"
  },

  image: {
    width: "100%",
    maxWidth: "540px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    objectFit: "contain",
    transform:
      "perspective(1200px) rotateY(-12deg) rotateX(5deg)",
    filter: "drop-shadow(0 30px 40px rgba(0,0,0,.45))",
    transition: "all .4s ease"
  },

  imageHover: {
    width: "100%",
    maxWidth: "540px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    objectFit: "contain",
    transform:
      "perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.03)",
    filter: "drop-shadow(0 35px 50px rgba(0,0,0,.5))",
    transition: "all .4s ease"
  },

  imageMobile: {
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    objectFit: "contain",
    filter: "drop-shadow(0 20px 30px rgba(0,0,0,.4))"
  },

  blueGlow: {
    color: "#6f8fff",
    fontStyle: "italic",
    textShadow: "0 0 18px rgba(111,143,255,.35)"
  }
};

export default Hero;