import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tilt from "../components/Tilt";
import { CartContext } from "../context/CartContext";
import { ALL_PRODUCTS, FILTERS, SUBCATS } from "../data/catalog";

/* Product data + descriptions live in src/data/productDetails.js — edit there. */

function Catalog() {
  const [active, setActive] = useState("ALL");
  const [sub, setSub] = useState("All");

  const subList = SUBCATS[active];

  let filtered = ALL_PRODUCTS;
  if (active !== "ALL") filtered = filtered.filter((p) => p.category === active);
  if (subList && sub !== "All") filtered = filtered.filter((p) => p.sub === sub);

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <Link to="/" style={styles.back}>← Home</Link>

        <p style={styles.tag}>THE FULL DROP</p>

        <h1 style={styles.heading}>
          Everything, <span style={styles.gold}>in one</span><br />place.
        </h1>

        {/* MAIN CATEGORY FILTERS */}
        <div style={styles.filters}>
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => { setActive(item); setSub("All"); }}
              style={{
                ...styles.btn,
                background: active === item ? "#221F1A" : "#F2EDE3",
                color: active === item ? "#fff" : "#221F1A",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* SUB-CATEGORY FILTERS */}
        {subList && (
          <div style={styles.subFilters}>
            {["All", ...subList].map((s) => (
              <button
                key={s}
                onClick={() => setSub(s)}
                style={{
                  ...styles.subBtn,
                  background: sub === s ? "rgba(44,46,107,.12)" : "transparent",
                  borderColor: sub === s ? "#2C2E6B" : "rgba(17,17,17,.18)",
                  color: sub === s ? "#21224F" : "#444",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* GRID or EMPTY STATE */}
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <h2 style={styles.emptyTitle}>Dropping soon 👀</h2>
            <p style={styles.emptyText}>
              {active === "ALL" ? "Designs" : active}
              {subList && sub !== "All" ? ` · ${sub}` : ""} land here the
              second they're ready. Stay tuned.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

/* CARD — click image/title to open the product page */
function Card({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const open = () => navigate(`/product/${product.slug}`);

  return (
    <motion.div whileHover={{ y: -8 }} style={styles.card}>
      <div style={{ cursor: "pointer" }} onClick={open}>
        {product.back ? (
          <div style={styles.imageWrap} className="card">
            <div className="card-inner">
              <div className="card-front">
                <img src={product.front} alt={product.title} style={styles.image} />
              </div>
              <div className="card-back">
                <img src={product.back} alt={product.title} style={styles.image} />
              </div>
            </div>
          </div>
        ) : (
          <Tilt max={14} scale={1.05} style={styles.imageWrap}>
            <img src={product.front} alt={product.title} style={styles.imageContain} />
          </Tilt>
        )}

        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.cat}>{product.sub ? `${product.category} · ${product.sub}` : product.category}</p>
        <p style={styles.price}>₹{product.price}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        style={styles.cartBtn}
      >
        Add to Cart
      </button>
    </motion.div>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "140px 40px 80px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#FAF7F1,#F2EDE3,#FAF7F1)",
  },
  back: {
    position: "fixed",
    top: "90px",
    left: "18px",
    color: "#221F1A",
    textDecoration: "none",
    zIndex: 10,
  },
  tag: { color: "#2C2E6B", letterSpacing: "4px", fontSize: "12px" },
  heading: { fontSize: "88px", color: "#221F1A", marginBottom: "30px" },
  gold: { color: "#2C2E6B" },
  filters: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" },
  btn: {
    border: "none",
    padding: "11px 20px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
  subFilters: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px" },
  subBtn: {
    padding: "8px 18px",
    borderRadius: "40px",
    border: "1px solid",
    background: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "28px",
    marginTop: "10px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid rgba(17,17,17,.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,.04)",
  },
  imageWrap: {
    height: "300px",
    overflow: "hidden",
    borderRadius: "12px",
    background: "rgba(17,17,17,.03)",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  imageContain: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "12px",
    boxSizing: "border-box",
  },
  title: { color: "#221F1A", marginTop: "14px", fontSize: "18px" },
  cat: { color: "#2C2E6B", fontSize: "13px", marginTop: "2px" },
  price: { color: "#221F1A", marginTop: "4px", fontWeight: 600 },
  cartBtn: {
    marginTop: "12px",
    padding: "11px",
    width: "100%",
    background: "#2C2E6B",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
  },
  empty: {
    minHeight: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#221F1A",
    border: "1px dashed rgba(17,17,17,.12)",
    borderRadius: "20px",
    marginTop: "10px",
  },
  emptyTitle: { fontSize: "34px", color: "#2C2E6B", marginBottom: "8px" },
  emptyText: { color: "#7C766B", maxWidth: "440px" },
};

export default Catalog;
