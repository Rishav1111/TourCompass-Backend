const Booking = require("../models/booking.model");
const Guide = require("../models/guide.model");
const Traveler = require("../models/traveler.model");
const Destination = require("../models/destination.model");

const createBooking = async (req, res) => {
  const { travelerId, guideId, destinationId, travelDate } = req.body;

  console.log(travelerId, guideId);
  try {
    // Checking if the traveler, guide, and destination exist
    const [traveler, guide, destination] = await Promise.all([
      Traveler.findById(travelerId),
      Guide.findById(guideId),
      Destination.findById(destinationId),
    ]);

    if (!traveler || !guide || !destination) {
      return res
        .status(404)
        .json({ error: "Traveler, Guide, or Destination not found" });
    }

    const newBooking = Booking({
      traveler: travelerId,
      guide: guideId,
      destination: destinationId,
      status: "requested",
      travelDate: travelDate,
    });
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBooking,
};
