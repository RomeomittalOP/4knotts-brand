import { motion } from "framer-motion";

// Reusable scroll-reveal wrapper: fades + rises into view once.
function Reveal({ children, delay = 0, y = 40, style }) {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
