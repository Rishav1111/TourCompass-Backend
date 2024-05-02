const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: true,
  },
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
    required: true,
  },
  eventType: {
    type: String,
    enum: [
      "BookingRequest",
      "BookingConfirmation",
      "BookingCancelled",
      "BookingCompleted",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Unread", "Read"],
    default: "Unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
