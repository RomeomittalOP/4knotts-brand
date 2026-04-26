import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* AUTO IMPORT ALL PRODUCTS */
const a4Front = Object.values(
  import.meta.glob(
    "../assets/products/a4/*-front.png",
    { eager: true, import: "default" }
  )
);

const a4Back = Object.values(
  import.meta.glob(
    "../assets/products/a4/*-back.png",
    { eager: true, import: "default" }
  )
);

const a5Front = Object.values(
  import.meta.glob(
    "../assets/products/a5/*-front.png",
    { eager: true, import: "default" }
  )
);

const a5Back = Object.values(
  import.meta.glob(
    "../assets/products/a5/*-back.png",
    { eager: true, import: "default" }
  )
);

const executiveFront = Object.values(
  import.meta.glob(
    "../assets/products/executive/*-front.png",
    { eager: true, import: "default" }
  )
);

const executiveBack = Object.values(
  import.meta.glob(
    "../assets/products/executive/*-back.png",
    { eager: true, import: "default" }
  )
);

/* CREATE PRODUCT ARRAYS */
const makeProducts = (
  frontArr,
  backArr,
  category,
  title
) =>
  frontArr.map((img, i) => ({
    title: `${title} ${i + 1}`,
    category,
    front: img,
    back: backArr[i]
  }));

function Catalog() {
  const [active, setActive] = useState("ALL");
  const [popup, setPopup] = useState(false);

  const products = [
    ...makeProducts(
      a4Front,
      a4Back,
      "A4",
      "A4 Premium"
    ),

    ...makeProducts(
      a5Front,
      a5Back,
      "A5",
      "A5 Notebook"
    ),

    ...makeProducts(
      executiveFront,
      executiveBack,
      "EXECUTIVE",
      "Executive Series"
    )
  ];

  const filters = [
    "ALL",
    "A4",
    "A5",
    "EXECUTIVE",
    "SPIRAL",
    "OFFICE",
    "PENS"
  ];

  const filtered =
    active === "ALL"
      ? products
      : products.filter(
          (item) =>
            item.category === active
        );

  const clickFilter = (item) => {
    if (
      item === "SPIRAL" ||
      item === "OFFICE" ||
      item === "PENS"
    ) {
      setPopup(true);

      setTimeout(() => {
        setPopup(false);
      }, 2200);
    } else {
      setActive(item);
    }
  };

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <Link to="/" style={styles.back}>
          ← Home
        </Link>

        <p style={styles.tag}>
          PREMIUM COLLECTION
        </p>

        <h1 style={styles.heading}>
          The{" "}
          <span style={styles.gold}>
            complete
          </span>
          <br />
          collection.
        </h1>

        <div style={styles.filters}>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() =>
                clickFilter(item)
              }
              style={{
                ...styles.btn,
                background:
                  active === item
                    ? "#d4af37"
                    : "#111",
                color:
                  active === item
                    ? "#111"
                    : "#fff"
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filtered.map((item, i) => (
            <Card
              key={i}
              product={item}
            />
          ))}
        </div>
      </section>

      {popup && (
        <div style={styles.popup}>
          ✨ Coming Soon
        </div>
      )}

      <Footer />
    </>
  );
}

function Card({ product }) {
  const [flip, setFlip] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02
      }}
      transition={{
        duration: 0.3
      }}
      onClick={() =>
        setFlip(!flip)
      }
      style={styles.card}
    >
      <div style={styles.imageWrap}>
        <img
          src={
            flip
              ? product.back
              : product.front
          }
          style={styles.image}
        />
      </div>

      <h3 style={styles.title}>
        {product.title}
      </h3>

      <p style={styles.cat}>
        {product.category}
      </p>
    </motion.div>
  );
}

const styles = {
  page: {
    padding: "140px 40px 80px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#02040b,#07162f,#02040b)"
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
    lineHeight: ".92",
    color: "white",
    margin: "10px 0 35px",
    fontFamily:
      "Cormorant Garamond"
  },

  gold: {
    color: "#d4af37"
  },

  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "35px"
  },

  btn: {
    border: "none",
    padding: "14px 22px",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "700"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "28px"
  },

  card: {
    background:
      "linear-gradient(145deg,#0e1528,#08101c)",
    borderRadius: "22px",
    padding: "20px",
    cursor: "pointer",
    border:
      "1px solid rgba(212,175,55,.12)"
  },

  imageWrap: {
    height: "330px",
    borderRadius: "18px",
    overflow: "hidden",
    background: "#0c1220"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  title: {
    color: "white",
    fontSize: "28px",
    marginTop: "16px",
    fontFamily:
      "Cormorant Garamond"
  },

  cat: {
    color: "#d4af37",
    marginTop: "8px"
  },

  popup: {
    position: "fixed",
    right: "30px",
    bottom: "30px",
    background: "#d4af37",
    color: "#111",
    padding: "16px 22px",
    borderRadius: "14px",
    fontWeight: "700"
  }
};

export default Catalog;