import { useState } from "react";
import { motion } from "framer-motion";

const LINE = 40; // px between ruled lines

// An interactive ruled notebook page — type and it appears in handwriting.
export default function WriteNote() {
  const [text, setText] = useState("");

  return (
    <motion.div
      style={styles.sheet}
      initial={{ opacity: 0, y: 30, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ rotate: 0, y: -4 }}
    >
      {/* spiral holes */}
      <div style={styles.spiral}>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} style={styles.hole} />
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing… ✍️"
        maxLength={240}
        spellCheck={false}
        style={styles.area}
      />

      <div style={styles.foot}>
        <span style={styles.brand}>— on a Noted page</span>
        <div style={styles.right}>
          <span style={styles.count}>{text.length}/240</span>
          {text && (
            <button style={styles.clear} onClick={() => setText("")}>
              Clear
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  sheet: {
    position: "relative",
    width: "min(620px, 100%)",
    margin: "0 auto",
    background: "#fffdf8",
    borderRadius: "10px 18px 18px 10px",
    border: "1px solid #ece7da",
    boxShadow: "0 40px 80px rgba(0,0,0,.12)",
    padding: "30px 34px 18px 70px",
    backgroundImage:
      `repeating-linear-gradient(#fffdf8, #fffdf8 ${LINE - 1}px, #cfdcec ${LINE - 1}px, #cfdcec ${LINE}px),` +
      "linear-gradient(90deg, transparent 52px, #efc4c4 52px, #efc4c4 54px, transparent 54px)",
    backgroundPosition: "0 18px, 0 0",
  },
  spiral: {
    position: "absolute",
    left: "20px",
    top: "26px",
    bottom: "26px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  hole: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#f0ece1",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.25)",
  },
  area: {
    width: "100%",
    minHeight: `${LINE * 5}px`,
    border: "none",
    outline: "none",
    resize: "vertical",
    background: "transparent",
    fontFamily: '"Caveat", cursive',
    fontSize: "28px",
    lineHeight: `${LINE}px`,
    color: "#2C2E6B",
    overflow: "hidden",
  },
  foot: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontFamily: '"Caveat", cursive',
    fontSize: "20px",
    color: "#9a8f7c",
  },
  right: { display: "flex", alignItems: "center", gap: "14px" },
  count: { fontSize: "12px", color: "#a59b88" },
  clear: {
    border: "1px solid #e2dbcd",
    background: "#fff",
    color: "#7C766B",
    borderRadius: "999px",
    padding: "5px 14px",
    fontSize: "12px",
    cursor: "pointer",
  },
};
