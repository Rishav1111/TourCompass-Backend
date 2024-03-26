const mongoose = require("mongoose");

const destSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Destination", destSchema);
