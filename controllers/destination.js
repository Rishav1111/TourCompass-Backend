const Destination = require("../models/destination.model");

const createDest = async (req, res) => {
  const { placeName, longitude, latitude } = req.body;

  try {
    if ((!placeName, !longitude || !latitude)) {
      return res
        .status(400)
        .json({ msg: "Please provide place name, longitude and latitude" });
    }

    const newDest = Destination({
      placeName: placeName,
      longitude: longitude,
      latitude: latitude,
    });

    await newDest.save();
    res
      .status(201)
      .json({ message: "Place stored successfully!", Destionation: newDest });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createDest,
};
