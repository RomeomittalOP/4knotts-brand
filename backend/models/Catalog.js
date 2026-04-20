const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
{
  name: String,
  email: String,
  company: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Catalog", catalogSchema);