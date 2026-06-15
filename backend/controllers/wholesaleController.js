// backend/controllers/wholesaleController.js
// Wholesale enquiries == the "bulkEnquiries" collection.

const Wholesale = require("../models/Wholesale");
const sendEmail = require("../utils/sendEmail");

const submitWholesale = async (req, res) => {
  try {
    // Duplicate-submission guard: same email + phone within 2 minutes.
    const dup = await Wholesale.findOne({
      email: req.body.email,
      phone: req.body.phone,
      createdAt: { $gte: new Date(Date.now() - 120000) },
    });
    if (dup) {
      return res.status(200).json({
        success: true,
        duplicate: true,
        message: "Enquiry already received",
      });
    }

    const newWholesale = new Wholesale(req.body);
    await newWholesale.save();

    // Email is best-effort — never fail the submission if mail is down.
    try {
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
    } catch (mailErr) {
      console.log("Wholesale email skipped:", mailErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully",
    });
  } catch (error) {
    console.log("Wholesale Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: list all bulk enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Wholesale.find().sort({ createdAt: -1 });
    res.json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: update status
const updateStatus = async (req, res) => {
  try {
    const enquiry = await Wholesale.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitWholesale, getEnquiries, updateStatus };
