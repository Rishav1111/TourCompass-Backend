const UserLocation = require("../models/users_location.model");
const Booking = require("../models/booking.model");

const saveLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    // Check if a document with the provided user ID exists
    let userLocation = await UserLocation.findOne({ userId });

    if (userLocation) {
      userLocation.latitude = latitude;
      userLocation.longitude = longitude;
    } else {
      userLocation = new UserLocation({
        userId: userId,
        latitude: latitude,
        longitude: longitude,
      });
    }

    // Save the user location document
    await userLocation.save();

    res.status(200).json({ message: "User location saved successfully" });
  } catch (error) {
    console.error("Error saving user location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving user location" });
  }
};

const getUserLocation = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user location document with the provided user ID
    const userLocation = await UserLocation.findOne({ userId });

    if (!userLocation) {
      return res.status(404).json({ error: "User location not found" });
    }

    const { latitude, longitude } = userLocation;

    res.status(200).json({ latitude, longitude });
  } catch (error) {
    console.error("Error fetching user location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user location" });
  }
};

const getGuideLocation = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the traveler's bookings that are confirmed
    const bookings = await Booking.find({
      traveler: userId,
      status: "Confirmed",
    }).populate("guide");

    if (!bookings || bookings.length === 0) {
      // If no confirmed bookings found for the traveler
      return res
        .status(404)
        .json({ message: "No confirmed bookings found for the traveler" });
    }

    const guideIds = bookings.map((booking) => booking.guide);

    // Find the locations of all guides associated with the bookings
    const guideLocations = await UserLocation.find({
      userId: { $in: guideIds },
    });

    if (!guideLocations || guideLocations.length === 0) {
      // If guide's locations not found
      return res.status(404).json({ message: "Guide's locations not found" });
    }

    // Return the guide locations
    return res.status(200).json({ guideLocations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveLocation, getUserLocation, getGuideLocation };
