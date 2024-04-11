const Booking = require("../models/booking.model");
const Guide = require("../models/guide.model");
const Traveler = require("../models/traveler.model");

const createBooking = async (req, res) => {
  const { travelerId, guideId, destination, negotiatedPrice, travelDate } =
    req.body;

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
      negotiatedPrice: negotiatedPrice,
      status: "Requested",
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

const getGuideByBooking = async (req, res) => {
  const { travelerId } = req.params;
  try {
    // Find bookings made by the traveler
    const bookings = await Booking.find({ traveler: travelerId });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for the traveler" });
    }

    // Extracting guideIds from bookings
    const guideIds = bookings.map((booking) => booking.guide);

    // Retrieving guide details for each guideId
    const guides = await Guide.find({ _id: { $in: guideIds } });

    // Extracting guide details and booking status
    const guideDetails = guides.map((guide) => {
      const booking = bookings.find((booking) =>
        booking.guide.equals(guide._id)
      );
      return {
        firstname: guide.firstname,
        lastname: guide.lastname,
        expertPlace: guide.expertPlace,
        guidePhoto: guide.guidePhoto,
        negotiatedPrice: booking ? booking.negotiatedPrice : null,
        status: booking ? booking.status : "No Booking Status",
        travelDate: booking ? booking.travelDate : null,
      };
    });

    res.status(200).json(guideDetails);

    console.log(guideDetails);
  } catch (error) {
    console.error("Error fetching guide details by booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTravelerByBooking = async (req, res) => {
  const { guideId } = req.params;
  try {
    // Find bookings assigned to the guide
    const bookings = await Booking.find({ guide: guideId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for the guide" });
    }

    // Extracting travelerIds from bookings
    const travelerIds = bookings.map((booking) => booking.traveler);

    // Retrieving traveler details for each travelerId
    const travelers = await Traveler.find({ _id: { $in: travelerIds } });

    // Extracting traveler details and booking status
    const travelerDetails = travelers.map((traveler) => {
      const booking = bookings.find((booking) =>
        booking.traveler.equals(traveler._id)
      );
      return {
        firstname: traveler.firstname,
        lastname: traveler.lastname,
        negotiatedPrice: booking ? booking.negotiatedPrice : null,
        destination: booking ? booking.destination : null,
        status: booking ? booking.status : "No Booking Status",
        travelDate: booking ? booking.travelDate : null,
        bookingId: booking ? booking._id : null,
      };
    });

    res.status(200).json(travelerDetails);
  } catch (error) {
    console.error("Error fetching traveler details by booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { action } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    let updatedBooking;
    switch (action) {
      case "confirm":
        updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          { status: "Confirmed" },
          { new: true }
        );
        break;
      case "cancel":
        updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          { status: "Cancelled" },
          { new: true }
        );
        break;
      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getGuideByBooking,
  getTravelerByBooking,
  createBooking,
  updateBookingStatus,
};
