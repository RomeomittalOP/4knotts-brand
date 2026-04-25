// ===============================
// WHOLESALEPAGE.jsx (FULL REPLACE)
// ===============================

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function WholesalePage() {
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://fourknotts-backend.onrender.com/api/wholesale",
        formData
      );

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      alert("Submission Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section style={styles.page}>
        <div style={styles.wrap}>
          <p style={styles.tag}>WHOLESALE • BULK • BESPOKE</p>

          <h1 style={styles.heading}>
            Begin a <span style={styles.gold}>conversation.</span>
          </h1>

          <p style={styles.sub}>
            Premium notebooks, corporate gifting, institutional supply
            and custom branded stationery solutions for businesses.
          </p>

          {/* TRUST BAR */}
          <div style={styles.trust}>
            <div>MOQ Flexible</div>
            <div>Fast Dispatch</div>
            <div>Pan India Delivery</div>
            <div>Brand Customization</div>
          </div>

          <div style={styles.grid}>
            {/* LEFT */}
            <div style={styles.leftCard}>
              <h3 style={styles.cardTitle}>Visit Our Studio</h3>

              <p style={styles.info}>
                C-3/187, Sector 31, Noida <br />
                Uttar Pradesh, India
              </p>

              <p style={styles.info}>
                +91 9310592022 <br />
                wholesale@4knotts.in
              </p>

              <p style={styles.info}>
                Mon–Sat : 10 AM – 7 PM
              </p>

              <div style={styles.mapWrap}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7007.421832142097!2d77.33218669644944!3d28.578442274466784"
                  title="Map"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "0",
                  }}
                ></iframe>
              </div>
            </div>

            {/* RIGHT */}
            <div style={styles.formCard}>
              <h3 style={styles.cardTitle}>Request Bulk Quote</h3>

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
                    placeholder="Company"
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
                    name="product"
                    placeholder="Product Type"
                    value={formData.product}
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

                <textarea
                  style={styles.textarea}
                  name="message"
                  placeholder="Tell us your requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button style={styles.btn} type="submit">
                  SUBMIT ENQUIRY →
                </button>
              </form>
            </div>
          </div>
        </div>

        {showPopup && (
          <div style={styles.popup}>
            ✅ Enquiry Submitted Successfully
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    background: "#040404",
    color: "white",
    padding: "130px 25px 80px",
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
    fontSize: "78px",
    fontFamily: "Cormorant Garamond",
    margin: "12px 0",
  },

  gold: {
    color: "#d4af37",
  },

  sub: {
    color: "#b7b7b7",
    fontSize: "18px",
    maxWidth: "700px",
    lineHeight: "1.8",
  },

  trust: {
    marginTop: "35px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    background: "#f8f6ef",
    color: "#111",
    borderRadius: "18px",
    overflow: "hidden",
    fontWeight: "600",
  },

  grid: {
    marginTop: "35px",
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "28px",
  },

  leftCard: {
    background: "#0b0b0b",
    border: "1px solid rgba(212,175,55,.15)",
    borderRadius: "24px",
    padding: "32px",
  },

  formCard: {
    background: "#f8f6ef",
    color: "#111",
    borderRadius: "24px",
    padding: "32px",
  },

  cardTitle: {
    fontSize: "34px",
    fontFamily: "Cormorant Garamond",
    marginBottom: "20px",
  },

  info: {
    lineHeight: "1.9",
    color: "#d2d2d2",
    marginBottom: "18px",
  },

  mapWrap: {
    marginTop: "20px",
    height: "260px",
    borderRadius: "18px",
    overflow: "hidden",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "14px",
  },

  input: {
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "white",
  },

  textarea: {
    width: "100%",
    height: "140px",
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
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  popup: {
    position: "fixed",
    top: "30px",
    right: "30px",
    background: "#111",
    color: "white",
    padding: "14px 20px",
    borderRadius: "12px",
    zIndex: 9999,
  },
};

export default WholesalePage;