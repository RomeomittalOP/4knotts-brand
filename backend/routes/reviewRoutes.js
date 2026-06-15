const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Create a review (public). Duplicate-submission guard: same name+text within 2 min.
router.post("/", async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    if (!review || review.trim().length < 3) {
      return res.status(400).json({ success: false, message: "Review too short" });
    }
    const text = review.trim();
    const dup = await Review.findOne({
      name: name || "Guest",
      review: text,
      createdAt: { $gte: new Date(Date.now() - 120000) },
    });
    if (dup) return res.json({ success: true, duplicate: true, review: dup });

    const doc = await Review.create({
      name: name || "Guest",
      rating: Number(rating) || 5,
      review: text,
      approved: false,
    });
    res.json({ success: true, review: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Public: only approved reviews (for the website)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, reviews });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: all reviews
router.get("/all", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: approve / unapprove
router.patch("/:id/approve", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: req.body.approved !== false },
      { new: true }
    );
    res.json({ success: true, review });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Admin: delete
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
