const Booking = require("../models/booking.model");
const Guide = require("../models/guide.model");
const Traveler = require("../models/traveler.model");

const createBooking = async (req, res) => {
  const { travelerId, guideId, destination, travelDate } = req.body;

  try {
    // Checking if the traveler, guide exist
    const [traveler, guide] = await Promise.all([
      Traveler.findById(travelerId),
      Guide.findById(guideId),
    ]);

    if (!traveler || !guide) {
      return res.status(404).json({ error: "Traveler or Guide not found" });
    }

    const newBooking = Booking({
      traveler: traveler,
      guide: guide,
      destination: destination,
      status: "requested",
      travelDate: travelDate,
    });
    await newBooking.save();
    console.log("New booking created!");
    res
      .status(200)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBooking,
};
