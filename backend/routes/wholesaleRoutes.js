const express = require("express");
const router = express.Router();

const {
  submitWholesale
} = require("../controllers/wholesaleController");

router.post("/", submitWholesale);

module.exports = router;