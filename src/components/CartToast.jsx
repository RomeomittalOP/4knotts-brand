import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../context/CartContext";

// Slides in a premium gold toast whenever a product is added to the cart.
function CartToast() {
  const { toast, dismissToast } = useContext(CartContext);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast._t}
          style={styles.wrap}
          initial={{ opacity: 0, y: 24, x: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={styles.checkWrap}>
            <span style={styles.check}>✓</span>
          </div>

          {toast.front && (
            <img src={toast.front} alt={toast.title} style={styles.img} />
          )}

          <div style={styles.body}>
            <p style={styles.added}>Added to cart</p>
            <p style={styles.title}>{toast.title}</p>
            <Link to="/cart" style={styles.link} onClick={dismissToast}>
              View Cart →
            </Link>
          </div>

          <button style={styles.close} onClick={dismissToast}>
            ✕
          </button>

          {/* progress bar */}
          <motion.div
            style={styles.progress}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.8, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  wrap: {
    position: "fixed",
    bottom: "28px",
    right: "28px",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "min(340px, 90vw)",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "rgba(10,14,26,.92)",
    border: "1px solid rgba(212,175,55,.35)",
    boxShadow: "0 18px 50px rgba(0,0,0,.5)",
    backdropFilter: "blur(14px)",
    overflow: "hidden",
  },
  checkWrap: {
    flexShrink: 0,
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#f5d77a,#d4af37)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  check: { color: "#111", fontWeight: 800, fontSize: "16px" },
  img: {
    width: "46px",
    height: "46px",
    borderRadius: "10px",
    objectFit: "cover",
    flexShrink: 0,
  },
  body: { flex: 1, minWidth: 0 },
  added: {
    margin: 0,
    color: "#d4af37",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    margin: "2px 0 4px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  link: {
    color: "#cfd6e6",
    fontSize: "12px",
    textDecoration: "none",
    fontWeight: 600,
  },
  close: {
    flexShrink: 0,
    background: "transparent",
    border: "none",
    color: "#7c859d",
    cursor: "pointer",
    fontSize: "13px",
    alignSelf: "flex-start",
  },
  progress: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "3px",
    width: "100%",
    transformOrigin: "left",
    background: "linear-gradient(90deg,#f5d77a,#d4af37)",
  },
};

export default CartToast;
