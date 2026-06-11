import { motion, useScroll, useSpring } from "framer-motion";

// Thin gold bar at the very top that fills as you scroll the page.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99998,
        background: "linear-gradient(90deg,#5B60C0,#2C2E6B,#21224F)",
        boxShadow: "0 0 12px rgba(44,46,107,.5)",
      }}
    />
  );
}

export default ScrollProgress;
