import heroImage from "../assets/products/hero.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Hero() {
  const [mobile, setMobile] = useState(false);

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
          DELHI • PREMIUM STATIONERY • SINCE 1978
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
        <div style={mobile ? styles.boxMobile : styles.box}></div>

        <img
          src={heroImage}
          alt="4 Knotts Products"
          style={mobile ? styles.imageMobile : styles.image}
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
"radial-gradient(circle at top left, rgba(95,126,255,.08), transparent 30%), linear-gradient(135deg,#02040b,#050913,#02040b)",
    color: "white"
  },

  heroMobile: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    padding: "120px 22px 50px",
    background:
"radial-gradient(circle at top left, rgba(95,126,255,.08), transparent 30%), linear-gradient(135deg,#02040b,#050913,#02040b)",
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

  blue: {
    color: "#6f8fff",
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

  primaryBtn:{
background:"linear-gradient(135deg,#6f8fff,#4d6fff)",
color:"white",
textDecoration:"none",
padding:"16px 26px",
borderRadius:"6px",
textAlign:"center",
boxShadow:"0 10px 25px rgba(95,126,255,.25)"
},

  outlineBtn:{
border:"1px solid rgba(255,255,255,.18)",
color:"white",
textDecoration:"none",
padding:"16px 26px",
borderRadius:"6px",
textAlign:"center",
backdropFilter:"blur(8px)"
},

  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  box: {
    width: "520px",
    height: "520px",
    background: "linear-gradient(135deg,#364055,#071120)",
    position: "absolute",
    borderRadius: "8px"
  },

  boxMobile: {
    width: "280px",
    height: "280px",
    background: "linear-gradient(135deg,#364055,#071120)",
    position: "absolute",
    borderRadius: "8px"
  },

  image: {
    width: "100%",
    maxWidth: "620px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    objectFit: "contain"
  },

  imageMobile: {
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    objectFit: "contain"
  },
  blueGlow:{
color:"#6f8fff",
fontStyle:"italic",
textShadow:"0 0 18px rgba(111,143,255,.35)"
},
};

export default Hero;