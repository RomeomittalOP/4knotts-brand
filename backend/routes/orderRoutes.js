// const express = require("express");
// const router = express.Router();

// const Order = require("../models/Order");
// const sendEmail = require("../utils/sendEmail"); // 🔥 ADD

// // 🧾 EMAIL TEMPLATE
// const orderTemplate = (order) => {
//   return `
//     <h2>🛒 Order Confirmed!</h2>
//     <p>Hi ${order.name},</p>

//     <p>Your order has been successfully placed 🎉</p>

//     <h3>📦 Order Details:</h3>
//     <ul>
//       ${order.items.map(
//         (item) =>
//           `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`
//       ).join("")}
//     </ul>

//     <h3>Total: ₹${order.total}</h3>

//     <p>🚚 Delivery in 4-5 days</p>

//     <p>Thanks for shopping with us ❤️</p>
//   `;
// };

// // ✅ CREATE ORDER + SEND EMAIL
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, items, total } = req.body;

//     // 🔥 1. Save order in DB
//     const order = new Order(req.body);
//     await order.save();

//     // 🔥 2. Send Email
//     const html = orderTemplate({ name, items, total });

//     await sendEmail({
//       to: email,
//       subject: "Your Order is Confirmed 🛒",
//       html
//     });

//     res.status(200).json({
//       message: "Order saved & email sent successfully"
//     });

//   } catch (err) {
//     console.log("Order Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;Confirm Payment

const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ✅ CREATE ORDER (SAFE VERSION)
router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming Order:", req.body);

    const { name, email, items, total } = req.body;

    // 🔥 BASIC VALIDATION
    if (!email || !items || items.length === 0) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    // 🔥 CLEAN ITEMS (SAFE STRUCTURE)
    const cleanItems = items.map((item) => ({
      title: item.title || "Item",
      price: item.price || 0,
      qty: item.qty || 1
    }));

    // 🔥 CREATE ORDER OBJECT
    const order = new Order({
      name: name || "User",
      email,
      items: cleanItems,
      total
    });

    // 🔥 SAVE TO DB
    await order.save();

    console.log("✅ Order Saved Successfully");

    res.status(200).json({
      success: true,
      message: "Order placed successfully 🎉"
    });

  } catch (err) {
    console.log("❌ Order Error:", err);

    res.status(500).json({
      error: "Server error while placing order"
    });
  }
});

module.exports = router;