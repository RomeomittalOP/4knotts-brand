const Wholesale = require("../models/Wholesale");

const submitWholesale = async (req, res) => {
  try {
    const newData = await Wholesale.create(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry Submitted Successfully",
      data: newData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitWholesale };