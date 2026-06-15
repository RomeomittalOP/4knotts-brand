const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    coverText: String,
    size: String,
    pages: String,
    binding: String,
    uploadedDesign: String, // image url / filename / note
    price: Number,
    status: { type: String, default: "new" }, // new | in-progress | done
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomRequest", customRequestSchema);
