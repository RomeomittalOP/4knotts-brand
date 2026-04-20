import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

    console.log("FORM SUBMIT STARTED");

    try {
      const res = await axios.post(
        "https://fourknotts-backend.onrender.com/api/wholesale",
        formData
      );

      console.log("SUCCESS:", res.data);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

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
      console.log("ERROR:", error);
      alert("Submission Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="wholesale-page">
        <p className="mini">WHOLESALE & BESPOKE</p>

        <h1>
          Begin a <span>conversation.</span>
        </h1>

        <div className="wholesale-grid">
          {/* LEFT SIDE */}
          <div className="contact-side">
            <h4>ATELIER</h4>

            <p>
              C-3/187, Noida <br />
              Sector-31, Uttar Pradesh <br />
              India - 201301
            </p>

            <h4>DIRECT</h4>

            <p>
              +91 9310592022 <br />
              wholesale@4knotts.in
            </p>

            <h4>HOURS</h4>

            <p>
              Mon-Sat: 10:00–19:00 IST <br />
              Sunday Closed
            </p>

            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7007.421832142097!2d77.33218669644944!3d28.578442274466784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5633a9723%3A0xdc0f4c1ac105ecee!2sC-Block%2C%20Sector%2031%2C%20Noida%2C%20Uttar%20Pradesh%20201303!5e0!3m2!1sen!2sin!4v1776679973440!5m2!1sen!2sin"
                title="Google Map"
                loading="lazy"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0",
                }}
              ></iframe>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="form-side">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="product"
                placeholder="Product Of Interest"
                value={formData.product}
                onChange={handleChange}
              />

              <input
                type="text"
                name="quantity"
                placeholder="Estimated Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">SUBMIT ENQUIRY →</button>
            </form>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="success-popup">
          ✅ Enquiry Submitted Successfully
        </div>
      )}
    </>
  );
}

export default WholesalePage;