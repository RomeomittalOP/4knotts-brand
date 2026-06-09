import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Premium one-time brand reveal. Shows once per browser session.
function IntroLoader() {
  const [show, setShow] = useState(
    () => !sessionStorage.getItem("introSeen")
  );

  useEffect(() => {
    if (!show) return;
    sessionStorage.setItem("introSeen", "1");
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setShow(false), 2600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={styles.wrap}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* gold glow */}
          <div style={styles.glow} />

          <motion.div
            style={styles.center}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              style={styles.word}
              initial={{ letterSpacing: "30px", opacity: 0 }}
              animate={{ letterSpacing: "8px", opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              NOTED
            </motion.h1>

            {/* gold line draw */}
            <motion.div
              style={styles.line}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              style={styles.sub}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              BY&nbsp;&nbsp;4&nbsp;&nbsp;KNOTTS
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  wrap: {
    position: "fixed",
    inset: 0,
    zIndex: 100000,
    background:
      "radial-gradient(circle at 50% 40%, #0a1020, #02040b 70%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,.18), transparent 65%)",
    filter: "blur(10px)",
  },
  center: {
    position: "relative",
    textAlign: "center",
  },
  word: {
    margin: 0,
    fontFamily: "Cormorant Garamond, serif",
    fontSize: "clamp(56px, 12vw, 130px)",
    fontWeight: 700,
    lineHeight: 1,
    background:
      "linear-gradient(120deg,#fff 20%,#f5d77a 45%,#d4af37 55%,#fff 80%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    animation: "introShimmer 2.4s linear infinite",
  },
  line: {
    height: "2px",
    width: "min(340px, 70vw)",
    margin: "18px auto",
    background:
      "linear-gradient(90deg,transparent,#d4af37,transparent)",
    transformOrigin: "center",
  },
  sub: {
    margin: 0,
    color: "#cfd6e6",
    fontSize: "13px",
    letterSpacing: "6px",
    fontWeight: 500,
  },
};

export default IntroLoader;
