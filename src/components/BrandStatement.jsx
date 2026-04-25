function BrandStatement() {
}

const styles = {
  section: {
    position: "relative",
    padding: "110px 40px",
    textAlign: "center",
    background:
      "linear-gradient(180deg,#02060d,#07111f,#02060d)",
    overflow: "hidden",
    color: "white"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    opacity: 0.06,
    backgroundImage:
      "radial-gradient(#ffffff 0.8px, transparent 0.8px)",
    backgroundSize: "18px 18px"
  },

  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    margin: "0 auto"
  },

  tag: {
    color: "#6f8fff",
    letterSpacing: "3px",
    fontSize: "12px",
    marginBottom: "20px"
  },

  heading: {
    fontSize: "56px",
    lineHeight: "1.1",
    marginBottom: "20px",
    fontFamily: "Cormorant Garamond"
  },

  desc: {
    color: "#b8b8b8",
    fontSize: "18px",
    lineHeight: "1.8"
  }
};

export default BrandStatement;