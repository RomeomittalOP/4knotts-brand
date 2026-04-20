const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  submitCustomization
} = require("../controllers/customizationController");

router.post(
  "/",
  upload.single("image"),
  submitCustomization
);

module.exports = router;