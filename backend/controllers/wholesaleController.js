const Wholesale = require("../models/Wholesale");

const submitWholesale = async (req, res) => {
  try {
    console.log("Wholesale Form Data:", req.body);

    const newData = await Wholesale.create({
      name: req.body.name || "",
      company: req.body.company || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      product: req.body.product || "",
      quantity: req.body.quantity || "",
      message: req.body.message || ""
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully",
      data: newData
    });

  } catch (error) {
    console.log("Wholesale Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = { submitWholesale };