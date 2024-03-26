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

module.exports = { saveLocation };
