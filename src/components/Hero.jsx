import heroImage from "../assets/products/hero.png";
function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.left}>
        <p style={styles.tag}>
          DELHI • PREMIUM STATIONERY • SINCE 1978
        </p>

        <h1 style={styles.heading}>
          Stationery <br />
          <span style={styles.blue}>for life.</span>
        </h1>

        <p style={styles.desc}>
          Premium spiral notebooks, executive collections,
          A4 designs and office essentials crafted for
          schools, corporates and serious brands.
        </p>

        <div style={styles.buttons}>
          <a href="#" style={styles.primaryBtn}>
            Explore Catalog
          </a>

          <a href="#" style={styles.outlineBtn}>
            Start Enquiry
          </a>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.box}></div>

        <img src={heroImage} style={styles.image} />
      </div>
    </section>
  );
}

const styles = {
  hero:{
minHeight:"100vh",
display:"grid",
gridTemplateColumns:"1.1fr .9fr",
alignItems:"center",
gap:"40px",
padding:"130px 60px 60px",
background:"#02040b",
color:"white"
},

  left: {},

  tag: {
    color: "#6f8fff",
    letterSpacing: "4px",
    fontSize: "12px",
    marginBottom: "25px"
  },

  heading:{
fontSize:"clamp(62px, 9vw, 128px)",
lineHeight:".9",
fontWeight:"300",
margin:0,
fontFamily:"Cormorant Garamond"
},

  blue: {
    color: "#6f8fff",
    fontStyle: "italic"
  },

  desc:{
marginTop:"28px",
maxWidth:"620px",
color:"#b8b8b8",
fontSize:"clamp(16px,2vw,21px)",
lineHeight:"1.8",
fontFamily:"Inter"
},

  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "40px"
  },

  primaryBtn: {
    background: "#5f7eff",
    padding: "18px 28px"
  },

  outlineBtn: {
    border: "1px solid rgba(255,255,255,.2)",
    padding: "18px 28px"
  },

  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center"
  },

  box: {
    width: "520px",
    height: "520px",
    background:
      "linear-gradient(135deg,#364055,#071120)",
    position: "absolute"
  },

  image: {
    width: "620px",
    position: "relative",
    zIndex: 2
  },
  bg:{
width:"100%",
maxWidth:"540px",
aspectRatio:"1/1",
background:"linear-gradient(135deg,#3a465d,#07111e)",
position:"absolute"
},
image:{
width:"100%",
maxWidth:"620px",
height:"auto",
position:"relative",
zIndex:2,
objectFit:"contain",
filter:"drop-shadow(0 30px 40px rgba(0,0,0,.45))"
},
right:{
position:"relative",
display:"flex",
justifyContent:"center",
alignItems:"center",
minWidth:"0"
}

};

export default Hero;