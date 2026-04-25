// =====================================
// CUSTOMIZATION.jsx (FULL PREMIUM REPLACE)
// =====================================

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Customization() {
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productType: "",
    quantity: "",
    size: "",
    message: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) data.append("image", image);

      await axios.post(
        "https://fourknotts-backend.onrender.com/api/customization",
        data
      );

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productType: "",
        quantity: "",
        size: "",
        message: "",
      });

      setImage(null);
    } catch (error) {
      alert("Submission Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <div style={styles.wrap}>
          <p style={styles.tag}>PREMIUM CUSTOMIZATION</p>

          <h1 style={styles.heading}>
            Make It <span style={styles.gold}>Uniquely Yours</span>
          </h1>

          <p style={styles.sub}>
            Create luxury notebooks, diaries and stationery with your
            logo, design theme, premium pages and custom packaging.
          </p>

          {/* TOP STEPS */}
          <div style={styles.steps}>
            {[
              "Choose Product",
              "Upload Artwork",
              "Approve Preview",
              "Receive Order",
            ].map((item, i) => (
              <div key={i} style={styles.stepCard}>
                <span style={styles.stepNo}>0{i + 1}</span>
                <p style={styles.stepText}>{item}</p>
              </div>
            ))}
          </div>

          {/* MAIN GRID */}
          <div style={styles.grid}>
            {/* LEFT FORM */}
            <div style={styles.formBox}>
              <h2 style={styles.formTitle}>
                Configure Your Project
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={styles.row}>
                  <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    style={styles.input}
                    type="text"
                    name="company"
                    placeholder="Brand / Company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div style={styles.row}>
                  <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    style={styles.input}
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.row}>
                  <input
                    style={styles.input}
                    type="text"
                    name="productType"
                    placeholder="Notebook / Diary / Register"
                    value={formData.productType}
                    onChange={handleChange}
                  />

                  <input
                    style={styles.input}
                    type="text"
                    name="quantity"
                    placeholder="Estimated Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <input
                  style={styles.input}
                  type="text"
                  name="size"
                  placeholder="A4 / A5 / Spiral / Executive"
                  value={formData.size}
                  onChange={handleChange}
                />

                <input
                  style={styles.input}
                  type="file"
                  onChange={handleFile}
                />

                <textarea
                  style={styles.textarea}
                  name="message"
                  placeholder="Describe your idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button style={styles.btn} type="submit">
                  REQUEST CUSTOM QUOTE →
                </button>
              </form>
            </div>

            {/* RIGHT */}
            <div style={styles.rightWrap}>
              <div style={styles.previewCard}>
                <p style={styles.smallTag}>LIVE PREVIEW</p>

                <div style={styles.book}></div>

                <p style={styles.previewText}>
                  Elegant notebook mockup shown here
                </p>
              </div>

              <div style={styles.infoCard}>
                <p style={styles.smallTag}>WHAT YOU GET</p>

                <ul style={styles.list}>
                  <li>✓ Premium 100 GSM paper</li>
                  <li>✓ Matte / Gloss finish</li>
                  <li>✓ Logo embossing</li>
                  <li>✓ Fast production timeline</li>
                  <li>✓ Pan India delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <div style={styles.popup}>
            ✅ Request Submitted Successfully
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "130px 25px 80px",
    background:
      "linear-gradient(135deg,#050505,#0d0d0d,#050505)",
    color: "white",
  },

  wrap: {
    maxWidth: "1450px",
    margin: "auto",
  },

  tag: {
    color: "#d4af37",
    letterSpacing: "4px",
    fontSize: "12px",
  },

  heading: {
    fontSize: "76px",
    margin: "10px 0",
    fontFamily: "Cormorant Garamond",
    lineHeight: "1",
  },

  gold: {
    color: "#d4af37",
    fontStyle: "italic",
  },

  sub: {
    color: "#c7c7c7",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "760px",
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "20px",
    marginTop: "45px",
  },

  stepCard: {
    padding: "26px",
    borderRadius: "20px",
    background: "#f8f6ef",
    color: "#111",
  },

  stepNo: {
    fontSize: "38px",
    color: "#d4af37",
    fontWeight: "700",
  },

  stepText: {
    marginTop: "10px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.1fr .9fr",
    gap: "30px",
    marginTop: "35px",
  },

  formBox: {
    background: "#f8f6ef",
    color: "#111",
    padding: "34px",
    borderRadius: "26px",
  },

  formTitle: {
    fontSize: "38px",
    marginBottom: "22px",
    fontFamily: "Cormorant Garamond",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "130px",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginBottom: "18px",
    boxSizing: "border-box",
  },

  btn: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "50px",
    background: "#111",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },

  rightWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  previewCard: {
    background: "#111",
    padding: "30px",
    borderRadius: "26px",
    textAlign: "center",
    border: "1px solid rgba(212,175,55,.15)",
  },

  smallTag: {
    color: "#d4af37",
    fontSize: "12px",
    letterSpacing: "3px",
  },

  book: {
    width: "170px",
    height: "230px",
    margin: "30px auto",
    borderRadius: "14px",
    background:
      "linear-gradient(145deg,#111,#d4af37,#222)",
    boxShadow:
      "0 0 30px rgba(212,175,55,.18)",
  },

  previewText: {
    color: "#bbb",
  },

  infoCard: {
    background: "#111",
    padding: "30px",
    borderRadius: "26px",
    border: "1px solid rgba(212,175,55,.15)",
  },

  list: {
    lineHeight: "2",
    color: "#ddd",
    paddingLeft: "18px",
  },

  popup: {
    position: "fixed",
    top: "30px",
    right: "30px",
    padding: "14px 20px",
    borderRadius: "12px",
    background: "#111",
    color: "white",
    zIndex: 9999,
  },
};

export default Customization;