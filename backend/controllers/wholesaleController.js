const Wholesale = require("../models/Wholesale");

const submitWholesale = async (req, res) => {
  try {
    console.log(req.body);

    const newWholesale = new Wholesale(req.body);
    await newWholesale.save();

    res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully"
    });

  } catch (error) {
    console.log("Wholesale Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitWholesale };