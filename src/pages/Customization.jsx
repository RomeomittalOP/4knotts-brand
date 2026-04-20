import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

    console.log("CUSTOM FORM SUBMIT STARTED");

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      const res = await axios.post(
        "https://fourknotts-backend.onrender.com/api/customization",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
        productType: "",
        quantity: "",
        size: "",
        message: "",
      });

      setImage(null);
    } catch (error) {
      console.log("ERROR:", error);
      alert("Submission Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="wholesale-page">
        <p className="mini">CUSTOM STATIONERY</p>

        <h1>
          Design your <span>own notebook.</span>
        </h1>

        <div className="wholesale-grid">
          {/* LEFT SIDE */}
          <div className="contact-side">
            <h4>CREATE YOUR IDEA</h4>

            <p>
              Premium custom notebooks,
              <br />
              diaries, office stationery
              <br />
              and branded packaging.
            </p>

            <h4>UPLOAD REFERENCE</h4>

            <p>
              Share logo, sample design,
              <br />
              image or sketch.
            </p>

            <div className="map-box">CUSTOM MADE</div>
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
                name="productType"
                placeholder="Product Type"
                value={formData.productType}
                onChange={handleChange}
              />

              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />

              <input
                type="text"
                name="size"
                placeholder="Size / Pages"
                value={formData.size}
                onChange={handleChange}
              />

              <input type="file" onChange={handleFile} />

              <textarea
                name="message"
                placeholder="Describe Your Idea *"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">
                SUBMIT CUSTOM REQUEST →
              </button>
            </form>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="success-popup">
          ✅ Custom Request Submitted
        </div>
      )}
    </>
  );
}

export default Customization;