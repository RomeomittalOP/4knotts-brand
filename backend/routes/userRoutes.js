const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register / sync a user. Idempotent (upsert by email) → never duplicates.
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "email required" });

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        $setOnInsert: { email: email.toLowerCase().trim(), role: role || "user" },
        ...(name ? { $set: { name } } : {}),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
