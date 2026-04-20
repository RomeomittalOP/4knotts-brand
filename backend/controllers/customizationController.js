const Customization = require("../models/Customization");

const submitCustomization = async (req, res) => {
  try {
    const newCustomization = new Customization({
      name: req.body.name || "",
      company: req.body.company || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      productType: req.body.productType || "",
      quantity: req.body.quantity || "",
      size: req.body.size || "",
      message: req.body.message || "",
      image: req.file ? req.file.filename : ""
    });

    await newCustomization.save();

    res.status(200).json({
      success: true,
      message: "Custom Request Submitted Successfully"
    });

  } catch (error) {
    console.log("Customization Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitCustomization };