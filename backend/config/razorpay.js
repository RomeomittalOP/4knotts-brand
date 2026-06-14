const Razorpay = require("razorpay");

// Razorpay client — stays null until you add the keys to .env
// (RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET). Get them from your
// Razorpay Dashboard → Settings → API Keys.
let instance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("Razorpay configured ✅");
} else {
  console.log("⚠️  Razorpay keys missing — payment will use COD until keys are added");
}

module.exports = instance;
