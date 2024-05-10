const Payment = require("../models/payment.model");

const confirmPayment = async (req, res) => {
  try {
    const { travelerId, token, guideId, amount, guideName } = req.body;

    const newPayment = new Payment({
      travelerId,
      token,
      guideId,
      amount,
      GuideName: guideName,
    });

    await newPayment.save();

    res.status(200).json({
      message: "Payment confirmed and saved successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { confirmPayment };
