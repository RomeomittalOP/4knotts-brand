// backend/controllers/customizationController.js

const Customization = require("../models/Customization");
const sendEmail = require("../utils/sendEmail");

const submitCustomization = async (req, res) => {
  try {
    const newCustomization = new Customization({
      name: req.body.name || "",
      company: req.body.company || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      productType: req.body.productType || "",
      quantity: req.body.quantity || "",
      size: req.body.size || "",
      message: req.body.message || "",
      image: req.file ? req.file.filename : ""
    });

    await newCustomization.save();

    await sendEmail(
      req.body.email,
      "Your Custom Request Has Been Received",
      `
      <h2>Thank You ${req.body.name}</h2>
      <p>Your customization request has been received successfully.</p>
      <p>Our team will review it and contact you soon.</p>
      <br/>
      <b>4 KNOTTS Stationery</b>
      `
    );

    res.status(200).json({
      success: true,
      message: "Custom Request Submitted Successfully"
    });

  } catch (error) {
    console.log("Customization Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitCustomization };