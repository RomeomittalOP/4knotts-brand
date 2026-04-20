const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  productType: String,
  quantity: String,
  size: String,
  message: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Customization", customizationSchema);