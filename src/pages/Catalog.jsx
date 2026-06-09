import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

/* =====================================================================
   AUTO IMPORT — just drop images into these folders and they show up.
   (supports .png .jpg .jpeg .webp)

   src/assets/products/
     crayons-chalks/          -> Crayons & Chalks
     folder/translucent/      -> Folder · Translucent
     folder/corporate/        -> Folder · Corporate
     folder/modern/           -> Folder · Modern
     file/corporate/          -> File · Corporate
     file/modern/             -> File · Modern
     binder/corporate/        -> Binder · Corporate
     binder/modern/           -> Binder · Modern
     notebooks/a4/            -> Notebook · A4
     notebooks/a5/            -> Notebook · A5
     notebooks/spiral/        -> Notebook · Spiral
     paints/                  -> Paints
     pencils/                 -> Pencil
     pens/                    -> Pens
     pouches/                 -> Pouch

   Optional flip card: name two files "<name>-front.png" and
   "<name>-back.png" — they pair into a front/back flip card.
   Otherwise each single image becomes one product card.
   The file name becomes the product title.
===================================================================== */

const G = {
  crayons:     import.meta.glob("../assets/products/crayons-chalks/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderTrans: import.meta.glob("../assets/products/folder/translucent/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderCorp:  import.meta.glob("../assets/products/folder/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderMod:   import.meta.glob("../assets/products/folder/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  fileCorp:    import.meta.glob("../assets/products/file/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  fileMod:     import.meta.glob("../assets/products/file/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  binderCorp:  import.meta.glob("../assets/products/binder/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  binderMod:   import.meta.glob("../assets/products/binder/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbA4:        import.meta.glob("../assets/products/notebooks/a4/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbA5:        import.meta.glob("../assets/products/notebooks/a5/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbSpiral:    import.meta.glob("../assets/products/notebooks/spiral/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  paints:      import.meta.glob("../assets/products/paints/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pencils:     import.meta.glob("../assets/products/pencils/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pens:        import.meta.glob("../assets/products/pens/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pouches:     import.meta.glob("../assets/products/pouches/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
};

const PRICE = {
  "Crayons & Chalks": 99,
  "Folder": 89,
  "File": 69,
  "Binder": 129,
  "Notebook": 199,
  "Paints": 149,
  "Pencil": 49,
  "Pens": 59,
  "Pouch": 129,
};

/* which categories have sub-categories (drives the sub-filter row) */
const SUBCATS = {
  "Folder": ["Translucent", "Corporate", "Modern"],
  "File": ["Corporate", "Modern"],
  "Binder": ["Corporate", "Modern"],
  "Notebook": ["A4", "A5", "Spiral"],
};

/* order of the main filter bar */
const FILTERS = [
  "ALL",
  "Crayons & Chalks",
  "Folder",
  "File",
  "Binder",
  "Notebook",
  "Paints",
  "Pencil",
  "Pens",
  "Pouch",
];

const prettify = (s) =>
  s.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()
   .replace(/\b\w/g, (c) => c.toUpperCase());

/* group files into products, pairing -front / -back when present */
function build(glob, category, sub) {
  const groups = {};
  for (const [path, src] of Object.entries(glob)) {
    const fname = path.split("/").pop().replace(/\.(png|jpe?g|webp)$/i, "");
    const m = fname.match(/^(.*?)[-_](front|back)$/i);
    const base = m ? m[1] : fname;
    const side = m ? m[2].toLowerCase() : "front";
    if (!groups[base]) groups[base] = { base };
    groups[base][side] = src;
  }
  return Object.values(groups).map((g, i) => ({
    id: `${category}-${sub || "x"}-${i}`,
    title: prettify(g.base) || `${category} ${i + 1}`,
    category,
    sub: sub || null,
    front: g.front || g.back,
    back: g.back || null,
    price: PRICE[category] ?? 99,
  }));
}

const PRODUCTS = [
  ...build(G.crayons, "Crayons & Chalks"),
  ...build(G.folderTrans, "Folder", "Translucent"),
  ...build(G.folderCorp, "Folder", "Corporate"),
  ...build(G.folderMod, "Folder", "Modern"),
  ...build(G.fileCorp, "File", "Corporate"),
  ...build(G.fileMod, "File", "Modern"),
  ...build(G.binderCorp, "Binder", "Corporate"),
  ...build(G.binderMod, "Binder", "Modern"),
  ...build(G.nbA4, "Notebook", "A4"),
  ...build(G.nbA5, "Notebook", "A5"),
  ...build(G.nbSpiral, "Notebook", "Spiral"),
  ...build(G.paints, "Paints"),
  ...build(G.pencils, "Pencil"),
  ...build(G.pens, "Pens"),
  ...build(G.pouches, "Pouch"),
];

function Catalog() {
  const [active, setActive] = useState("ALL");
  const [sub, setSub] = useState("All");

  const subList = SUBCATS[active]; // undefined if category has no subs

  let filtered = PRODUCTS;
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
                background: active === item ? "#d4af37" : "#111",
                color: active === item ? "#111" : "#fff",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* SUB-CATEGORY FILTERS (only when the category has subs) */}
        {subList && (
          <div style={styles.subFilters}>
            {["All", ...subList].map((s) => (
              <button
                key={s}
                onClick={() => setSub(s)}
                style={{
                  ...styles.subBtn,
                  background: sub === s ? "rgba(212,175,55,.18)" : "transparent",
                  borderColor: sub === s ? "#d4af37" : "rgba(255,255,255,.18)",
                  color: sub === s ? "#d4af37" : "#cfd6e6",
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

/* CARD */
function Card({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} style={styles.card}>
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
        <div style={styles.imageWrap}>
          <img src={product.front} alt={product.title} style={styles.imageContain} />
        </div>
      )}

      <h3 style={styles.title}>{product.title}</h3>
      <p style={styles.cat}>{product.sub ? `${product.category} · ${product.sub}` : product.category}</p>
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
    background: "linear-gradient(135deg,#02040b,#07162f,#02040b)",
  },

  back: {
    position: "fixed",
    top: "90px",
    left: "18px",
    color: "white",
    textDecoration: "none",
    zIndex: 10,
  },

  tag: { color: "#7da4ff", letterSpacing: "4px", fontSize: "12px" },

  heading: { fontSize: "88px", color: "white", marginBottom: "30px" },

  gold: { color: "#d4af37" },

  filters: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },

  btn: {
    border: "none",
    padding: "11px 20px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },

  subFilters: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

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
    background: "#0e1528",
    borderRadius: "20px",
    padding: "20px",
  },

  imageWrap: {
    height: "300px",
    overflow: "hidden",
    borderRadius: "12px",
    background: "rgba(255,255,255,.03)",
  },

  image: { width: "100%", height: "100%", objectFit: "cover" },

  imageContain: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "12px",
    boxSizing: "border-box",
  },

  title: { color: "white", marginTop: "14px", fontSize: "18px" },
  cat: { color: "#d4af37", fontSize: "13px", marginTop: "2px" },
  price: { color: "white", marginTop: "4px" },

  cartBtn: {
    marginTop: "12px",
    padding: "11px",
    width: "100%",
    background: "#d4af37",
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
    color: "white",
    border: "1px dashed rgba(255,255,255,.12)",
    borderRadius: "20px",
    marginTop: "10px",
  },

  emptyTitle: { fontSize: "34px", color: "#d4af37", marginBottom: "8px" },
  emptyText: { color: "#9aa4bd", maxWidth: "440px" },
};

export default Catalog;
