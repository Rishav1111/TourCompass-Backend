const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  destination: {
    type: String,
    required: true,
  },
  negotiatedPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Requested", "Confirmed", "Completed", "Cancelled"],
    default: "Requested",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Cash Pay", "Khalti Pay"],
    default: "Pending",
  },
  travelDate: { type: Date, required: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
