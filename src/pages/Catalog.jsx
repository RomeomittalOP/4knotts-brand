import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

/* AUTO IMPORT */
const a4Front = Object.values(import.meta.glob("../assets/products/a4/*-front.png", { eager: true, import: "default" }));
const a4Back = Object.values(import.meta.glob("../assets/products/a4/*-back.png", { eager: true, import: "default" }));

const a5Front = Object.values(import.meta.glob("../assets/products/a5/*-front.png", { eager: true, import: "default" }));
const a5Back = Object.values(import.meta.glob("../assets/products/a5/*-back.png", { eager: true, import: "default" }));

const executiveFront = Object.values(import.meta.glob("../assets/products/executive/*-front.png", { eager: true, import: "default" }));
const executiveBack = Object.values(import.meta.glob("../assets/products/executive/*-back.png", { eager: true, import: "default" }));

/* SPIRAL */
const spiralImages = Object.values(import.meta.glob("../assets/products/spiral/*", { eager: true, import: "default" }));

/* PRODUCT BUILDERS */
const makeProducts = (frontArr, backArr, category, title) =>
  frontArr.map((img, i) => ({
    id: `${category}-${i}`,
    title: `${title} ${i + 1}`,
    category,
    front: img,
    back: backArr[i],
    price: 199 + i * 20,
    isLandscape: false
  }));

const makeSpiral = (arr) =>
  arr.map((img, i) => ({
    id: `SPIRAL-${i}`,
    title: `Spiral Notebook ${i + 1}`,
    category: "SPIRAL",
    front: img,
    back: img,
    price: 199 + i * 20,
    isLandscape: true
  }));

function Catalog() {
  const [active, setActive] = useState("ALL");
  const [popup, setPopup] = useState(false);

  /* 🔥 FIXED FUNCTION */
  const clickFilter = (item) => {
    if (item === "PENS") {
      setPopup(true);
      return;
    }
    setActive(item);
  };

  const products = [
    ...makeProducts(a4Front, a4Back, "A4", "A4 Premium"),
    ...makeProducts(a5Front, a5Back, "A5", "A5 Notebook"),
    ...makeProducts(executiveFront, executiveBack, "EXECUTIVE", "Executive Series"),
    ...makeSpiral(spiralImages)
  ];

  const filters = ["ALL", "A4", "A5", "EXECUTIVE", "SPIRAL", "PENS"];

  const filtered =
    active === "ALL"
      ? products
      : products.filter((item) => item.category === active);

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <Link to="/" style={styles.back}>← Home</Link>

        <p style={styles.tag}>PREMIUM COLLECTION</p>

        <h1 style={styles.heading}>
          The <span style={styles.gold}>complete</span><br />collection.
        </h1>

        <div style={styles.filters}>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => clickFilter(item)}
              style={{
                ...styles.btn,
                background: active === item ? "#d4af37" : "#111",
                color: active === item ? "#111" : "#fff"
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filtered.map((item, i) => (
            <Card key={i} product={item} />
          ))}
        </div>
      </section>

      {/* 🔥 WORKING MODAL */}
      {popup && (
        <div style={styles.overlay} onClick={() => setPopup(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h1 style={styles.modalTitle}>COMING SOON</h1>
            <p style={styles.modalText}>
              Premium writing instruments are on the way.<br />
              Crafted. Designed. Perfected.
            </p>

            <button style={styles.closeBtn} onClick={() => setPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

/* CARD */
function Card({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} style={styles.card}>
      
      {product.isLandscape ? (
        <div style={{ ...styles.imageWrap, height: "180px" }}>
          <img src={product.front} style={styles.image} />
        </div>
      ) : (
        <div style={styles.imageWrap} className="card">
          <div className="card-inner">
            <div className="card-front">
              <img src={product.front} style={styles.image} />
            </div>
            <div className="card-back">
              <img src={product.back} style={styles.image} />
            </div>
          </div>
        </div>
      )}

      <h3 style={styles.title}>{product.title}</h3>
      <p style={styles.cat}>{product.category}</p>
      <p style={styles.price}>₹{product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
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
    background: "linear-gradient(135deg,#02040b,#07162f,#02040b)"
  },

  back: {
    position: "fixed",
    top: "90px",
    left: "18px",
    color: "white",
    textDecoration: "none"
  },

  tag: {
    color: "#7da4ff",
    letterSpacing: "4px",
    fontSize: "12px"
  },

  heading: {
    fontSize: "88px",
    color: "white",
    marginBottom: "30px"
  },

  gold: { color: "#d4af37" },

  filters: {
    display: "flex",
    gap: "14px",
    marginBottom: "35px"
  },

  btn: {
    border: "none",
    padding: "12px 20px",
    borderRadius: "40px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "28px"
  },

  card: {
    background: "#0e1528",
    borderRadius: "20px",
    padding: "20px"
  },

  imageWrap: {
    height: "320px",
    overflow: "hidden",
    borderRadius: "12px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  title: { color: "white", marginTop: "12px" },
  cat: { color: "#d4af37" },
  price: { color: "white" },

  cartBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#d4af37",
    border: "none"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  modal: {
    background: "#111",
    padding: "40px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center"
  },

  modalTitle: {
    fontSize: "32px",
    color: "#d4af37"
  },

  modalText: {
    marginTop: "10px"
  },

  closeBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#d4af37",
    border: "none",
    cursor: "pointer"
  }
};

export default Catalog;