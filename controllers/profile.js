const Guide = require("../models/guide.model");
const Traveller = require("../models/traveler.model");
const Booking = require("../models/booking.model");
const bcrypt = require("bcryptjs");

const updateTraveller = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phoneNumber } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await Traveller.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phoneNumber },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Traveller not found." });
    }

    res
      .status(200)
      .json({ updatedUser, msg: "Traveller updated successfully." });

    console.log("User updated: ", updatedUser);
  } catch (error) {
    console.error("Error updating traveller:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      licenseNumber,
      expertPlace,
      guidePrice,
      bio,
      licensePhoto,
      guidePhoto,
    } = req.body;

    const updatedUser = await Guide.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phoneNumber,
        licenseNumber,
        expertPlace,
        guidePrice,
        bio,
        licensePhoto,
        guidePhoto,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Guide not found." });
    }

    console.log("updated");
    res.status(200).json({ updatedUser, msg: "Guide updated successfully." });
  } catch (error) {
    console.error("Error updating guide:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllTraveller = async (req, res) => {
  try {
    const users = await Traveller.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting travellers", error);
  }
};
const getAllGuide = async (req, res) => {
  try {
    const users = await Guide.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting travellers", error);
  }
};

const countTravelers = async (req, res) => {
  try {
    const count = await Traveller.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

const countGuides = async (req, res) => {
  try {
    const count = await Guide.countDocuments();
    console.log(count);
    res.json(count);
  } catch (error) {
    console.error("Error counting guides:", error);
    res.status(500).json({ error: "Failed to count guides" });
  }
};

const getGuidebySearch = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const travelDate = req.query.date;

    let filter = {};
    if (searchQuery) {
      // Check if the first word matches
      const firstWordRegex = new RegExp(`^${searchQuery.split(" ")[0]}`, "i");
      filter = { expertPlace: firstWordRegex };
    }

    const bookings = await Booking.find({
      status: "Confirmed",
      travelDate: new Date(travelDate),
    });

    console.log("Guides with confirmed", bookings);

    const guideIdsWithConfirmedBookings = bookings.map(
      (booking) => booking.guide
    );

    // Update the filter to exclude guides with confirmed bookings for the specified date
    filter._id = { $nin: guideIdsWithConfirmedBookings };

    const guides = await Guide.find(filter);

    res.status(200).json(guides);
  } catch (error) {
    console.log("Error getting guides", error);
    res.status(500).json({ error: "An error occurred while fetching guides" });
  }
};

const getTraveller = async (req, res) => {
  try {
    const { id } = req.params;
    const traveller = await Traveller.findOne({ _id: id });

    if (!traveller) {
      return res.status(404).json({ error: "Traveller not found" });
    }

    const { firstname, lastname, email, phoneNumber } = traveller;

    res.status(200).json({ firstname, lastname, email, phoneNumber });
  } catch (error) {
    console.error("Error fetching traveller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await Guide.findOne({ _id: id });
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      licenseNumber,
      expertPlace,
      guidePrice,
      bio,
      licensePhoto,
      guidePhoto,
    } = guide;

    res.status(200).json({
      firstname,
      lastname,
      email,
      phoneNumber,
      licenseNumber,
      expertPlace,
      guidePrice,
      bio,
      licensePhoto,
      guidePhoto,
    });
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = (await Traveller.findById(id)) || (await Guide.findById(id));

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid current password." });
    }

    // Checking if the new password is different from the current password
    const checkNewPassandCurrent = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (checkNewPassandCurrent) {
      return res.status(400).json({
        error: "New password must be different from the current password.",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        error: "New password and confirm new password doesn't match.",
      });
    }
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTraveller = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTraveler = await Traveller.findById(id);
    if (!existingTraveler) {
      return res.status(404).json({ msg: "Traveler not found." });
    }

    await Traveller.findByIdAndDelete(id);

    res.status(200).json({ msg: "Traveller deleted successfully." });
  } catch (error) {
    console.error("Error deleting traveller:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const existingGuide = await Guide.findById(id);
    if (!existingGuide) {
      return res.status(404).json({ msg: "Guide not found." });
    }

    await Guide.findByIdAndDelete(id);

    res.status(200).json({ msg: "Guide deleted successfully." });
  } catch (error) {
    console.error("Error deleting Guide:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateTraveller,
  updateGuide,
  getAllTraveller,
  getAllGuide,
  getGuidebySearch,
  getTraveller,
  getGuide,
  changePassword,
  deleteTraveller,
  deleteGuide,
  countTravelers,
  countGuides,
};
