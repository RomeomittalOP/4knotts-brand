const Wholesale = require("../models/Wholesale");

const submitWholesale = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const data = new Wholesale(req.body);
    await data.save();

    res.status(200).json({
      success: true,
      message: "Submitted Successfully"
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitWholesale };