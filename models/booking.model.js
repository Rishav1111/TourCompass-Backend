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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  },
  status: {
    type: String,
    enum: ["requested", "confirmed", "cancelled"],
    default: "requested",
  },
  travelDate: { type: Date, required: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
