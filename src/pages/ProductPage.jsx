import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageZoom from "../components/ImageZoom";
import { CartContext } from "../context/CartContext";
import { getProduct, avgRating } from "../data/catalog";

const Stars = ({ value, size = 16 }) => (
  <span style={{ color: "#2C2E6B", fontSize: size, letterSpacing: "2px" }}>
    {"★★★★★".slice(0, Math.round(value))}
    <span style={{ color: "#d9d4ca" }}>{"★★★★★".slice(Math.round(value))}</span>
  </span>
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={styles.notFound}>
          <h1 style={{ fontSize: "64px", color: "#2C2E6B", margin: 0 }}>404</h1>
          <p style={{ color: "#7C766B" }}>Yeh product nahi mila.</p>
          <Link to="/catalog" style={styles.backToCatalog}>← Back to Catalog</Link>
        </div>
        <Footer />
      </>
    );
  }

  const rating = avgRating(product.reviews);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <Link to="/catalog" style={styles.back}>← Back to Catalog</Link>

        <div style={styles.grid}>
          {/* LEFT — image */}
          <motion.div
            style={styles.imageCol}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.imageWrap}>
              <ImageZoom src={product.front} alt={product.title} />
            </div>
            {product.back && (
              <div style={styles.thumbRow}>
                <img src={product.front} alt="" style={styles.thumb} />
                <img src={product.back} alt="" style={styles.thumb} />
              </div>
            )}
          </motion.div>

          {/* RIGHT — details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={styles.crumb}>
              {product.sub ? `${product.category} · ${product.sub}` : product.category}
            </p>

            <h1 style={styles.title}>{product.title}</h1>

            <div style={styles.ratingRow}>
              <Stars value={rating} />
              <span style={styles.ratingText}>
                {rating} · {product.reviews.length} reviews
              </span>
            </div>

            <p style={styles.price}>₹{product.price}</p>

            <p style={styles.desc}>{product.description}</p>

            {/* SPECS */}
            <div style={styles.specs}>
              <div style={styles.specRow}>
                <span style={styles.specKey}>Dimensions</span>
                <span style={styles.specVal}>{product.dimensions}</span>
              </div>
              <div style={styles.specRow}>
                <span style={styles.specKey}>Material</span>
                <span style={styles.specVal}>{product.material}</span>
              </div>
            </div>

            {/* FEATURES */}
            {product.features?.length > 0 && (
              <ul style={styles.features}>
                {product.features.map((f) => (
                  <li key={f} style={styles.feature}>
                    <span style={styles.tick}>✓</span> {f}
                  </li>
                ))}
              </ul>
            )}

            {/* QTY + ADD TO CART */}
            <div style={styles.buyRow}>
              <div style={styles.qtyBox}>
                <button style={styles.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span style={styles.qtyVal}>{qty}</span>
                <button style={styles.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
              </div>

              <button style={styles.addBtn} onClick={handleAdd}>
                {added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* REVIEWS */}
        <div style={styles.reviewsSection}>
          <h2 style={styles.reviewsTitle}>Customer Reviews</h2>
          <div style={styles.reviewsHead}>
            <Stars value={rating} size={22} />
            <span style={styles.reviewsAvg}>{rating} out of 5</span>
            <span style={styles.reviewsCount}>· {product.reviews.length} reviews</span>
          </div>

          <div style={styles.reviewsGrid}>
            {product.reviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={styles.reviewTop}>
                  <div style={styles.avatar}>{r.name.charAt(0)}</div>
                  <div>
                    <p style={styles.reviewName}>{r.name}</p>
                    <Stars value={r.rating} size={13} />
                  </div>
                </div>
                <p style={styles.reviewText}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    padding: "130px 60px 80px",
    minHeight: "100vh",
    background: "#FAF7F1",
    color: "#221F1A",
  },
  back: { color: "#7C766B", textDecoration: "none", fontSize: "14px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "start",
    marginTop: "30px",
    maxWidth: "1300px",
  },

  imageCol: { position: "sticky", top: "110px" },
  imageWrap: {
    background: "#fff",
    borderRadius: "26px",
    border: "1px solid rgba(17,17,17,.06)",
    boxShadow: "0 30px 60px rgba(0,0,0,.08)",
    overflow: "visible",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%", objectFit: "contain", padding: "24px" },
  thumbRow: { display: "flex", gap: "12px", marginTop: "14px" },
  thumb: {
    width: "76px",
    height: "76px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid rgba(17,17,17,.08)",
    background: "#fff",
  },

  crumb: { color: "#2C2E6B", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" },
  title: { fontSize: "52px", margin: "8px 0 12px", lineHeight: 1.05 },
  ratingRow: { display: "flex", alignItems: "center", gap: "10px" },
  ratingText: { color: "#7C766B", fontSize: "14px" },
  price: { fontSize: "30px", fontWeight: 700, margin: "18px 0", color: "#221F1A" },
  desc: { color: "#444", fontSize: "17px", lineHeight: 1.8, maxWidth: "560px" },

  specs: {
    marginTop: "26px",
    borderTop: "1px solid rgba(17,17,17,.08)",
    borderBottom: "1px solid rgba(17,17,17,.08)",
    padding: "8px 0",
  },
  specRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid rgba(17,17,17,.04)",
  },
  specKey: { color: "#7C766B", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" },
  specVal: { color: "#221F1A", fontSize: "15px", fontWeight: 500 },

  features: { listStyle: "none", padding: 0, margin: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  feature: { display: "flex", alignItems: "center", gap: "10px", color: "#333", fontSize: "15px" },
  tick: {
    width: "20px", height: "20px", borderRadius: "50%",
    background: "rgba(44,46,107,.14)", color: "#21224F",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 800, flexShrink: 0,
  },

  buyRow: { display: "flex", gap: "16px", alignItems: "center", marginTop: "30px", flexWrap: "wrap" },
  qtyBox: {
    display: "flex", alignItems: "center", gap: "16px",
    border: "1px solid rgba(17,17,17,.15)", borderRadius: "999px", padding: "8px 18px",
  },
  qtyBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#221F1A", lineHeight: 1 },
  qtyVal: { fontSize: "16px", fontWeight: 600, minWidth: "20px", textAlign: "center" },
  addBtn: {
    flex: 1,
    minWidth: "200px",
    padding: "16px 34px",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#2C2E6B,#21224F)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(44,46,107,.3)",
  },

  reviewsSection: { marginTop: "90px", maxWidth: "1300px" },
  reviewsTitle: { fontSize: "40px", marginBottom: "14px" },
  reviewsHead: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" },
  reviewsAvg: { fontSize: "18px", fontWeight: 600 },
  reviewsCount: { color: "#7C766B" },
  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" },
  reviewCard: {
    background: "#fff",
    border: "1px solid rgba(17,17,17,.06)",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,.04)",
  },
  reviewTop: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  avatar: {
    width: "42px", height: "42px", borderRadius: "50%",
    background: "linear-gradient(135deg,#5B60C0,#2C2E6B)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: "18px",
  },
  reviewName: { margin: 0, fontWeight: 600, fontSize: "15px" },
  reviewText: { color: "#444", fontSize: "15px", lineHeight: 1.7, margin: 0 },

  notFound: {
    minHeight: "70vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "12px", background: "#FAF7F1",
  },
  backToCatalog: { color: "#2C2E6B", textDecoration: "none", fontWeight: 600, marginTop: "10px" },
};
