const mongoose = require("mongoose");

const wholesaleSchema = new mongoose.Schema(
{
  name: String,
  company: String,
  email: String,
  phone: String,
  product: String,
  quantity: String,
  message: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Wholesale", wholesaleSchema);