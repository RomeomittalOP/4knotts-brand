const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    qty: { type: Number, default: 1 },
    sub: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, index: true },

    name: String,
    email: String,
    phone: String,

    address: {
      line: String,
      city: String,
      state: String,
      pincode: String,
    },

    items: [itemSchema],

    subtotal: Number,
    shipping: { type: Number, default: 0 },
    total: Number,

    payment: {
      method: { type: String, default: "COD" }, // COD | Razorpay
      status: { type: String, default: "Pending" }, // Pending | Paid | Failed
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },

    // Processing | Shipped | Delivered | Cancelled
    status: { type: String, default: "Processing" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
