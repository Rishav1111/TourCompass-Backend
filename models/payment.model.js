const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  travelerId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  guideId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  GuideName: {
    type: String,
  },
  dateOfPayment: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
