const sendEmail = require("../utils/sendEmail");

// 🧾 EMAIL TEMPLATE
const orderTemplate = (order) => {
  return `
    <h2>🛒 Order Confirmed!</h2>
    <p>Hi ${order.name},</p>

    <p>Your order has been successfully placed 🎉</p>

    <h3>📦 Order Details:</h3>
    <ul>
      ${order.items.map(
        (item) =>
          `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`
      ).join("")}
    </ul>

    <h3>Total: ₹${order.total}</h3>

    <p>🚚 Delivery in 4-5 days</p>

    <p>Thanks for shopping with us ❤️</p>
  `;
};

// 🚀 MAIN CONTROLLER
const placeOrder = async (req, res) => {
  try {
    const { name, email, items, total } = req.body;

    // 🔥 (OPTIONAL) MongoDB save yaha karega
    // await Order.create({ name, email, items, total });

    // 🔥 EMAIL SEND
    const html = orderTemplate({ name, items, total });

    await sendEmail({
      to: email,
      subject: "Order Confirmed 🛒",
      html
    });

    res.status(200).json({
      success: true,
      message: "Order placed & email sent"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order failed" });
  }
};

module.exports = { placeOrder };