const express = require("express");
const router = express.Router();
const CustomRequest = require("../models/CustomRequest");

// Submit a custom-notebook request. Dedupe: same email+coverText within 2 min.
router.post("/", async (req, res) => {
  try {
    const d = req.body || {};
    const dup = await CustomRequest.findOne({
      email: d.email,
      coverText: d.coverText,
      createdAt: { $gte: new Date(Date.now() - 120000) },
    });
    if (dup) return res.json({ success: true, duplicate: true, request: dup });

    const request = await CustomRequest.create({
      name: d.name,
      email: d.email,
      phone: d.phone,
      coverText: d.coverText,
      size: d.size,
      pages: d.pages,
      binding: d.binding,
      uploadedDesign: d.uploadedDesign,
      price: d.price,
    });
    res.json({ success: true, request });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: all custom requests
router.get("/", async (req, res) => {
  try {
    const requests = await CustomRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: update status
router.patch("/:id/status", async (req, res) => {
  try {
    const request = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, request });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
