// backend/controllers/wholesaleController.js

const Wholesale = require("../models/Wholesale");
const sendEmail = require("../utils/sendEmail");

const submitWholesale = async (req, res) => {
  try {
    const newWholesale = new Wholesale(req.body);
    await newWholesale.save();

    await sendEmail(
      req.body.email,
      "Thank You For Contacting 4 KNOTTS",
      `
      <h2>Thank You ${req.body.name}</h2>
      <p>We have received your wholesale enquiry successfully.</p>
      <p>Our team will contact you shortly.</p>
      <br/>
      <b>4 KNOTTS Stationery</b>
      `
    );

    res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully"
    });

  } catch (error) {
    console.log("Wholesale Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitWholesale };