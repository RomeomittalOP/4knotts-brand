// backend/controllers/catalogController.js

const sendEmail = require("../utils/sendEmail");

const requestCatalog = async (req, res) => {
  try {
    const { name, email, company } = req.body;

    await sendEmail(
      email,
      "4 KNOTTS Catalogue Request Received",
      `
      <h2>Hello ${name || "Customer"},</h2>
      <p>Thank you for requesting the 4 KNOTTS Catalogue.</p>
      <p>We have received your request successfully.</p>
      <p>Our team will share the catalogue with you shortly.</p>

      ${
        company
          ? `<p><b>Company:</b> ${company}</p>`
          : ""
      }

      <br/>
      <b>4 KNOTTS Stationery</b>
      `
    );

    res.status(200).json({
      success: true,
      message: "Catalogue Request Submitted Successfully"
    });

  } catch (error) {
    console.log("Catalog Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { requestCatalog };