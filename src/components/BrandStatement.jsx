import { motion } from "framer-motion";

function BrandStatement() {
  return (
    <section style={styles.section}>
      <div style={styles.overlay} />

      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p style={styles.tag}>REAL TALK</p>

        <h2 style={styles.heading}>
          “A good notebook doesn't just hold your ideas —
          <span style={{ color: "#2C2E6B" }}> it makes them iconic.”</span>
        </h2>

        <p style={styles.desc}>
          Every page is made for the writers, dreamers and the ones
          chasing their main-character era. Quality in every little
          detail — that's the whole vibe of Noted By 4 Knotts.
        </p>
      </motion.div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    padding: "110px 40px",
    textAlign: "center",
    background:
      "linear-gradient(180deg,#FAF7F1,#F2EDE3,#FAF7F1)",
    overflow: "hidden",
    color: "#221F1A"
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
    color: "#2C2E6B",
    letterSpacing: "3px",
    fontSize: "12px",
    marginBottom: "20px"
  },

  heading: {
    fontSize: "56px",
    lineHeight: "1.1",
    marginBottom: "20px",
    fontFamily: "Fraunces"
  },

  desc: {
    color: "#666666",
    fontSize: "18px",
    lineHeight: "1.8"
  }
};

export default BrandStatement;