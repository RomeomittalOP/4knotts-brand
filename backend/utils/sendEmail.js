const nodemailer = require("nodemailer");

// ✅ Create transporter ONCE (performance boost)
const transporter = nodemailer.createTransport({
  service: "gmail", // simpler than host/port
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Verify connection (optional but useful)
transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP Error ❌", err);
  } else {
    console.log("SMTP Ready ✅");
  }
});

// ✅ MAIN SEND FUNCTION
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"4 KNOTTS 🛒" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email Sent ✅:", info.messageId);

  } catch (error) {
    console.log("Email Error ❌:", error);
    throw error;
  }
};

module.exports = sendEmail;