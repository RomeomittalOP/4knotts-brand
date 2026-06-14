const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const genOrderId = () =>
  "NK" +
  Date.now().toString(36).toUpperCase().slice(-6) +
  Math.floor(Math.random() * 900 + 100);

// CREATE order (COD, or any pre-paid order coming from the client)
router.post("/", async (req, res) => {
  try {
    const d = req.body;
    if (!d.items || d.items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }

    const order = await Order.create({
      orderId: d.orderId || genOrderId(),
      name: d.name || d.address?.name,
      email: d.email || d.address?.email,
      phone: d.phone || d.address?.phone,
      address: d.address,
      items: d.items,
      subtotal: d.subtotal,
      shipping: d.shipping,
      total: d.total,
      payment: d.payment || { method: "COD", status: "Pending" },
    });

    res.json({ success: true, orderId: order.orderId, order });
  } catch (e) {
    console.log("create order error:", e);
    res.status(500).json({ error: e.message });
  }
});

// LIST orders (all, or by ?email= for a customer)
router.get("/", async (req, res) => {
  try {
    const q = req.query.email ? { email: req.query.email } : {};
    const orders = await Order.find(q).sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SINGLE order
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ success: true, order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE status (admin: Processing | Shipped | Delivered | Cancelled)
router.patch("/:orderId/status", async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ success: true, order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
