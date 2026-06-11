import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PRODUCTS } from "../data/catalog";

/* =====================================================================
   SLIDESHOW IMAGES — ✏️ drop your photos here:
     src/assets/slideshow/   (.png .jpg .jpeg .webp)
   They auto-load below. Until you add any, a nice mix of catalog
   product shots is used automatically.
===================================================================== */
const userSlides = Object.values(
  import.meta.glob("../assets/slideshow/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  })
);

// fallback — one nice shot per category, so it's never empty
const fallback = (() => {
  const seen = new Set();
  const out = [];
  for (const p of ALL_PRODUCTS) {
    const key = p.category + (p.sub || "");
    if (!seen.has(key) && p.front) {
      seen.add(key);
      out.push(p.front);
    }
  }
  return out;
})();

const SLIDES = userSlides.length ? userSlides : fallback;
const DURATION = 3600; // ms per slide

export default function HeroSlideshow() {
  const [i, setI] = useState(0);
  const n = SLIDES.length || 1;

  useEffect(() => {
    if (n < 2) return;
    const t = setTimeout(() => setI((p) => (p + 1) % n), DURATION);
    return () => clearTimeout(t);
  }, [i, n]);

  if (!SLIDES.length) return null;

  return (
    <div style={styles.frame}>
      <AnimatePresence>
        <motion.img
          key={i}
          src={SLIDES[i]}
          alt={`Noted by 4 Knotts — slide ${i + 1}`}
          style={styles.img}
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
            scale: { duration: 1.4, ease: "easeOut" },
          }}
        />
      </AnimatePresence>

      {/* arrows */}
      {n > 1 && (
        <>
          <button style={{ ...styles.nav, left: 14 }} onClick={() => setI((p) => (p - 1 + n) % n)} aria-label="Previous">‹</button>
          <button style={{ ...styles.nav, right: 14 }} onClick={() => setI((p) => (p + 1) % n)} aria-label="Next">›</button>

          {/* dots */}
          <div style={styles.dots}>
            {SLIDES.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Slide ${d + 1}`}
                style={{
                  ...styles.dot,
                  width: d === i ? "22px" : "7px",
                  background: d === i ? "#2C2E6B" : "rgba(34,31,26,.25)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  frame: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    marginTop: "44px",
    overflow: "hidden",
    background: "#f2ede3",
  },
  img: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    willChange: "transform, opacity",
  },
  nav: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,.82)",
    backdropFilter: "blur(6px)",
    color: "#221F1A",
    fontSize: "24px",
    lineHeight: 1,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,.18)",
    zIndex: 2,
  },
  dots: {
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "7px",
    alignItems: "center",
    zIndex: 2,
  },
  dot: {
    height: "7px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    transition: "width .3s, background .3s",
    padding: 0,
  },
};
