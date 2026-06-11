import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE = 40;
const KEY = "notedReviews";

const SEED = [
  { name: "Rohan Mehta", role: "Ops Lead, fintech firm", rating: 5, text: "We moved our whole office order to Noted. The paper quality alone got comments in meetings." },
  { name: "Sneha Kulkarni", role: "Admin, design college", rating: 5, text: "300 custom-branded notebooks delivered early and exactly on spec. Faultless." },
  { name: "Aditya Verma", role: "Writer", rating: 5, text: "Smoothest paper I've written on, and it doesn't bleed. I buy three at a time." },
];

const Stars = ({ value, onSet }) => (
  <div style={{ display: "flex", gap: "4px" }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        onClick={onSet ? () => onSet(n) : undefined}
        style={{
          color: n <= value ? "#F5A623" : "#d9d2c4",
          fontSize: onSet ? "26px" : "15px",
          cursor: onSet ? "pointer" : "default",
          lineHeight: 1,
        }}
      >
        ★
      </span>
    ))}
  </div>
);

export default function ReviewBoard() {
  const [reviews, setReviews] = useState(SEED);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (saved.length) setReviews([...saved, ...SEED]);
    } catch {}
  }, []);

  const post = () => {
    if (text.trim().length < 3) return;
    const review = {
      name: name.trim() || "Guest",
      role: "Verified customer",
      rating,
      text: text.trim(),
    };
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    localStorage.setItem(KEY, JSON.stringify([review, ...saved]));
    setReviews((prev) => [review, ...prev]);
    setText("");
    setName("");
    setRating(5);
    setPosted(true);
    setTimeout(() => setPosted(false), 2200);
  };

  return (
    <section className="band-2 ratings" id="reviews">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Stars speak</span>
          <h2>Leave your mark.</h2>
          <p className="lede" style={{ margin: "14px auto 0" }}>
            Loved it? Write us a note — it lands on the wall below.
          </p>
        </div>

        {/* WRITE A REVIEW — on a notebook page */}
        <motion.div
          style={styles.sheet}
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          whileHover={{ rotate: 0 }}
        >
          <div style={styles.spiral}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} style={styles.hole} />
            ))}
          </div>

          <div style={styles.starRow}>
            <Stars value={rating} onSet={setRating} />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review…"
            maxLength={240}
            spellCheck={false}
            style={styles.area}
          />

          <div style={styles.foot}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="— your name"
              style={styles.nameInput}
              maxLength={40}
            />
            <button style={styles.post} onClick={post}>
              {posted ? "Posted ✓" : "Post review"}
            </button>
          </div>
        </motion.div>

        {/* REVIEW WALL */}
        <div className="rgrid" style={{ marginTop: "56px" }}>
          <AnimatePresence initial={false}>
            {reviews.slice(0, 9).map((r, i) => (
              <motion.figure
                className="rcard"
                key={(r.name || "") + i + r.text.slice(0, 6)}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                <Stars value={r.rating} />
                <q>{r.text}</q>
                <figcaption className="rwho">
                  <span className="rav">
                    {(r.name || "G").charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <b>{r.name}</b>
                    <span>{r.role}</span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
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
    padding: "24px 34px 18px 70px",
    backgroundImage:
      `repeating-linear-gradient(#fffdf8, #fffdf8 ${LINE - 1}px, #cfdcec ${LINE - 1}px, #cfdcec ${LINE}px),` +
      "linear-gradient(90deg, transparent 52px, #efc4c4 52px, #efc4c4 54px, transparent 54px)",
    backgroundPosition: "0 62px, 0 0",
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
  starRow: { marginBottom: "10px" },
  area: {
    width: "100%",
    minHeight: `${LINE * 3}px`,
    border: "none",
    outline: "none",
    resize: "vertical",
    background: "transparent",
    fontFamily: '"Caveat", cursive',
    fontSize: "27px",
    lineHeight: `${LINE}px`,
    color: "#2C2E6B",
    overflow: "hidden",
  },
  foot: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  nameInput: {
    flex: 1,
    minWidth: "140px",
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: '"Caveat", cursive',
    fontSize: "22px",
    color: "#9a8f7c",
  },
  post: {
    border: "none",
    background: "#2C2E6B",
    color: "#fff",
    borderRadius: "999px",
    padding: "10px 22px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
