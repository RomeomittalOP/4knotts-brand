import { useState, useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import Tilt from "./Tilt";

const SIZES = {
  Pocket: { label: "Pocket", ratio: 0.66, add: -80 },
  A5: { label: "A5", ratio: 0.71, add: 0 },
  A4: { label: "A4", ratio: 0.71, add: 120 },
  Square: { label: "Square", ratio: 1, add: 60 },
};
const PAGES = { Ruled: 0, Dotted: 20, Plain: 0, Grid: 20 };
const BINDINGS = { Softcover: 0, Spiral: 40, Hardcover: 150 };
const COVERS = ["#2C2E6B", "#1F1B16", "#7C2B3B", "#1F5D4C", "#C24E2E", "#E7E1D4", "#3A3D85"];
const BASE = 299;

export default function NotebookBuilder() {
  const { addToCart } = useContext(CartContext);
  const fileRef = useRef(null);

  const [img, setImg] = useState(null);
  const [color, setColor] = useState("#2C2E6B");
  const [name, setName] = useState("");
  const [size, setSize] = useState("A5");
  const [pages, setPages] = useState("Ruled");
  const [binding, setBinding] = useState("Hardcover");

  const price = BASE + SIZES[size].add + PAGES[pages] + BINDINGS[binding] + (img ? 50 : 0);
  const lightCover = color === "#E7E1D4";

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(r.result);
    r.readAsDataURL(f);
  };

  // build a thumbnail (uploaded image, or a painted cover) for the cart
  const makeThumb = () =>
    new Promise((resolve) => {
      if (img) return resolve(img);
      const c = document.createElement("canvas");
      c.width = 300;
      c.height = 420;
      const ctx = c.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 300, 420);
      if (name) {
        ctx.fillStyle = lightCover ? "#221F1A" : "#fff";
        ctx.font = "600 26px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(name.slice(0, 16), 150, 380);
      }
      resolve(c.toDataURL("image/png"));
    });

  const addCustom = async () => {
    const front = await makeThumb();
    addToCart({
      id: `custom-${Date.now()}`,
      title: `Custom ${size} Notebook`,
      category: "Custom",
      sub: `${binding} · ${pages}`,
      front,
      price,
    });
  };

  return (
    <div style={styles.grid}>
      {/* LIVE PREVIEW */}
      <div style={styles.previewCol}>
        <span style={styles.liveTag}>● LIVE PREVIEW</span>
        <Tilt max={10} scale={1.02} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              ...styles.book,
              aspectRatio: SIZES[size].ratio,
              background: img
                ? `url(${img}) center/cover`
                : `linear-gradient(150deg, ${color}, ${shade(color)})`,
            }}
          >
            {binding === "Spiral" && (
              <div style={styles.spiral}>
                {Array.from({ length: 11 }).map((_, i) => (
                  <span key={i} style={styles.ring} />
                ))}
              </div>
            )}
            {binding === "Hardcover" && <div style={styles.spine} />}

            <div style={styles.coverInner}>
              <span style={{ ...styles.brandMark, color: lightCover ? "#221F1A" : "rgba(255,255,255,.85)" }}>
                NOTED
              </span>
              {name && (
                <span style={{ ...styles.coverName, color: lightCover ? "#221F1A" : "#fff" }}>
                  {name}
                </span>
              )}
            </div>
          </div>
        </Tilt>
        <p style={styles.hint}>Tilt it — drag your design, make it yours.</p>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        {/* upload */}
        <div style={styles.block}>
          <p style={styles.label}>Your cover</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} hidden />
          <div style={styles.row}>
            <button style={styles.uploadBtn} onClick={() => fileRef.current?.click()}>
              ⬆ Upload your design
            </button>
            {img && (
              <button style={styles.ghost} onClick={() => setImg(null)}>
                Remove
              </button>
            )}
          </div>
          {!img && (
            <div style={styles.swatches}>
              {COVERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                  style={{
                    ...styles.swatch,
                    background: c,
                    outline: color === c ? "2px solid #221F1A" : "1px solid rgba(0,0,0,.1)",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* name */}
        <div style={styles.block}>
          <p style={styles.label}>Cover text / name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aarav's Ideas"
            maxLength={22}
            style={styles.input}
          />
        </div>

        <Options title="Size" value={size} setValue={setSize} keys={Object.keys(SIZES)} />
        <Options title="Pages" value={pages} setValue={setPages} keys={Object.keys(PAGES)} />
        <Options title="Binding" value={binding} setValue={setBinding} keys={Object.keys(BINDINGS)} />

        <div style={styles.buyRow}>
          <div>
            <span style={styles.priceLabel}>Your price</span>
            <div style={styles.price}>₹{price}</div>
          </div>
          <button style={styles.addBtn} onClick={addCustom}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Options({ title, value, setValue, keys }) {
  return (
    <div style={styles.block}>
      <p style={styles.label}>{title}</p>
      <div style={styles.pillRow}>
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setValue(k)}
            style={{
              ...styles.pill,
              background: value === k ? "#221F1A" : "#F2EDE3",
              color: value === k ? "#fff" : "#221F1A",
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

// darken a hex a touch for the cover gradient
function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 26);
  const g = Math.max(0, ((n >> 8) & 255) - 26);
  const b = Math.max(0, (n & 255) - 26);
  return `rgb(${r},${g},${b})`;
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(28px,4vw,60px)",
    alignItems: "center",
    marginTop: "30px",
  },
  previewCol: { display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  liveTag: { color: "#2C2E6B", fontSize: "12px", letterSpacing: "3px", fontWeight: 600 },
  book: {
    width: "min(320px, 80%)",
    borderRadius: "8px 16px 16px 8px",
    boxShadow: "0 40px 70px rgba(0,0,0,.28)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
  },
  spine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "14px",
    background: "rgba(0,0,0,.22)",
  },
  spiral: {
    position: "absolute",
    left: "8px",
    top: "16px",
    bottom: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 2,
  },
  ring: {
    width: "16px",
    height: "10px",
    borderRadius: "8px",
    border: "2px solid rgba(255,255,255,.7)",
    borderLeft: "none",
  },
  coverInner: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    padding: "26px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  brandMark: { fontSize: "13px", letterSpacing: "4px", fontWeight: 700, alignSelf: "flex-start" },
  coverName: {
    fontFamily: '"Caveat", cursive',
    fontSize: "34px",
    marginTop: "auto",
    alignSelf: "flex-start",
    lineHeight: 1.1,
  },
  hint: { color: "#7C766B", fontSize: "13px" },

  controls: { display: "flex", flexDirection: "column", gap: "20px" },
  block: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#7C766B", fontWeight: 600 },
  row: { display: "flex", gap: "10px", flexWrap: "wrap" },
  uploadBtn: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "1.5px dashed #2C2E6B",
    background: "rgba(44,46,107,.05)",
    color: "#2C2E6B",
    fontWeight: 600,
    cursor: "pointer",
  },
  ghost: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #E2DBCD",
    background: "#fff",
    color: "#7C766B",
    cursor: "pointer",
  },
  swatches: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" },
  swatch: { width: "30px", height: "30px", borderRadius: "50%", border: "none", cursor: "pointer" },
  input: {
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1px solid #E2DBCD",
    background: "#fff",
    color: "#221F1A",
    fontSize: "15px",
    outline: "none",
  },
  pillRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  pill: {
    padding: "9px 18px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
  buyRow: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    borderTop: "1px solid #EDE7DA",
    paddingTop: "20px",
  },
  priceLabel: { fontSize: "12px", color: "#7C766B", letterSpacing: "1px", textTransform: "uppercase" },
  price: { fontSize: "30px", fontWeight: 700, color: "#221F1A" },
  addBtn: {
    padding: "15px 32px",
    borderRadius: "999px",
    border: "none",
    background: "#2C2E6B",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(44,46,107,.28)",
  },
};
