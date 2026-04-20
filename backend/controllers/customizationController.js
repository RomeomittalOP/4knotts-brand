const Customization = require("../models/Customization");

const submitCustomization = async (req, res) => {
  try {
    const newData = await Customization.create({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      productType: req.body.productType,
      quantity: req.body.quantity,
      size: req.body.size,
      message: req.body.message,
      image: req.file ? req.file.filename : ""
    });

    res.status(201).json({
      success: true,
      message: "Customization Request Submitted",
      data: newData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitCustomization };