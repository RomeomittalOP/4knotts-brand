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
            Make It <span style={styles.blue}>Uniquely Yours</span>
          </h1>

          <p style={styles.sub}>
            Build a premium notebook experience with your own branding,
            design language, pages, size and visual identity.
          </p>

          {/* TOP STEPS */}
          <div style={styles.steps}>
            {[
              "Choose Style",
              "Upload Design",
              "Approve Preview",
              "Receive Order",
            ].map((item, i) => (
              <div key={i} style={styles.stepCard}>
                <h3 style={styles.stepNo}>0{i + 1}</h3>
                <p style={styles.stepText}>{item}</p>
              </div>
            ))}
          </div>

          {/* MAIN GRID */}
          <div style={styles.grid}>
            {/* LEFT FORM */}
            <div style={styles.formBox}>
              <h2 style={styles.formTitle}>
                Configure Your Notebook
              </h2>

              <form onSubmit={handleSubmit}>
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

                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  style={styles.input}
                  type="text"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

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

                <button type="submit" style={styles.btn}>
                  REQUEST CUSTOM QUOTE →
                </button>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.rightWrap}>
              <div style={styles.previewCard}>
                <p style={styles.previewMini}>
                  LIVE PRODUCT PREVIEW
                </p>

                <div style={styles.book}></div>

                <p style={styles.previewText}>
                  Premium custom notebook visual appears here.
                </p>
              </div>

              <div style={styles.infoCard}>
                <p style={styles.previewMini}>
                  WHAT YOU GET
                </p>

                <ul style={styles.list}>
                  <li>✓ Premium paper quality</li>
                  <li>✓ Electric blue luxury finish</li>
                  <li>✓ Brand logo customization</li>
                  <li>✓ Fast production time</li>
                  <li>✓ Pan India shipping</li>
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
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "120px 25px 70px",
    background:
      "radial-gradient(circle at top left, rgba(95,126,255,.12), transparent 30%), linear-gradient(135deg,#02040b,#06101e,#02040b)",
    color: "white",
  },

  wrap: {
    maxWidth: "1450px",
    margin: "auto",
  },

  tag: {
    color: "#6f8fff",
    letterSpacing: "4px",
    fontSize: "13px",
  },

  heading: {
    fontSize: "68px",
    margin: "14px 0",
    fontFamily: "Cormorant Garamond",
    lineHeight: "1",
  },

  blue: {
    color: "#6f8fff",
    fontStyle: "italic",
    textShadow: "0 0 20px rgba(111,143,255,.25)",
  },

  sub: {
    color: "#aeb8cf",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "760px",
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "42px",
  },

  stepCard: {
    padding: "26px",
    borderRadius: "20px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(95,126,255,.15)",
    backdropFilter: "blur(10px)",
  },

  stepNo: {
    margin: 0,
    fontSize: "38px",
    color: "#304b8c",
  },

  stepText: {
    marginTop: "8px",
    fontSize: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.05fr .95fr",
    gap: "35px",
    marginTop: "45px",
  },

  formBox: {
    padding: "34px",
    borderRadius: "26px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(95,126,255,.14)",
    backdropFilter: "blur(16px)",
  },

  formTitle: {
    fontSize: "34px",
    marginBottom: "24px",
  },

  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "#0a1324",
    color: "white",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    height: "130px",
    padding: "16px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "#0a1324",
    color: "white",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  btn: {
    width: "100%",
    padding: "18px",
    borderRadius: "50px",
    border: "none",
    background:
      "linear-gradient(135deg,#6f8fff,#4b6fff)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow:
      "0 10px 30px rgba(95,126,255,.22)",
  },

  rightWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  previewCard: {
    padding: "34px",
    borderRadius: "26px",
    minHeight: "340px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(95,126,255,.14)",
    textAlign: "center",
  },

  previewMini: {
    color: "#6f8fff",
    fontSize: "13px",
    letterSpacing: "3px",
  },

  book: {
    width: "150px",
    height: "210px",
    margin: "35px auto",
    borderRadius: "14px",
    background:
      "linear-gradient(145deg,#1f3d8e,#6f8fff,#1b2e5f)",
    boxShadow:
      "0 0 30px rgba(95,126,255,.25)",
  },

  previewText: {
    color: "#b5bfd8",
  },

  infoCard: {
    padding: "30px",
    borderRadius: "26px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(95,126,255,.14)",
  },

  list: {
    lineHeight: "2",
    color: "#d9e0f0",
    paddingLeft: "18px",
  },

  popup: {
    position: "fixed",
    top: "30px",
    right: "30px",
    padding: "14px 20px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#6f8fff,#4b6fff)",
    color: "white",
    fontWeight: "700",
    zIndex: 9999,
  },
};

export default Customization;