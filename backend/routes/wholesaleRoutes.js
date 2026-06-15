const express = require("express");
const router = express.Router();

const {
  submitWholesale,
  getEnquiries,
  updateStatus,
} = require("../controllers/wholesaleController");

router.post("/", submitWholesale);
router.get("/", getEnquiries); // admin: view all bulk enquiries
router.patch("/:id/status", updateStatus); // admin: update status

module.exports = router;
