const UserLocation = require("../models/users_location.model");

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

module.exports = { saveLocation, getUserLocation };
