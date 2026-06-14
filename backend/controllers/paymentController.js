const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

const genOrderId = () =>
  "NK" +
  Date.now().toString(36).toUpperCase().slice(-6) +
  Math.floor(Math.random() * 900 + 100);

// 1) Create a Razorpay order (called before opening checkout)
exports.createPaymentOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res
        .status(503)
        .json({ error: "Razorpay not configured. Add keys to .env." });
    }
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "amount is required" });

    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json({
      success: true,
      order: rzpOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.log("createPaymentOrder error:", e);
    res.status(500).json({ error: e.message });
  }
};

// 2) Verify the signature after payment, then save the paid order
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData = {},
    } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    const orderId = genOrderId();
    const order = await Order.create({
      orderId,
      name: orderData.name || orderData.address?.name,
      email: orderData.email || orderData.address?.email,
      phone: orderData.phone || orderData.address?.phone,
      address: orderData.address,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      payment: {
        method: "Razorpay",
        status: "Paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    res.json({ success: true, orderId, order });
  } catch (e) {
    console.log("verifyPayment error:", e);
    res.status(500).json({ error: e.message });
  }
};
