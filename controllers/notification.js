const Notification = require("../models/notification.model");
const Traveler = require("../models/traveler.model");
const Guide = require("../models/guide.model");

const createNotification = async ({
  guideId,
  travelerId,
  eventType,
  status,
}) => {
  try {
    const travelerDetails = await Traveler.findById(travelerId);
    if (!travelerDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Traveler not found" });
    }

    const guideDetails = await Guide.findById(guideId);
    if (!guideDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Guide not found" });
    }

    // Get the first name and last name of traveler and guide
    const travelerName = `${travelerDetails.firstname} ${travelerDetails.lastname}`;
    const guideName = `${guideDetails.firstname} ${guideDetails.lastname}`;

    let message = "";
    if (eventType === "BookingRequest") {
      message = `You have a new booking request from traveler ${travelerName}.`;
    } else if (eventType === "BookingConfirmation") {
      message = `Your booking request has been confirmed by guide ${guideName}.`;
    } else if (eventType === "BookingCompleted") {
      message = `Your booking with guide ${guideName} has been completed.`;
    } else if (eventType === "BookingCancelled") {
      message = `Your booking has been cancelled.`;
    }

    const newNotification = new Notification({
      guideId,
      travelerId,
      eventType,
      message,
      status,
    });
    await newNotification.save();
    console.log("Notification created successfully for guide ID:", guideId);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

const getGuideNotifications = async (req, res) => {
  try {
    const { guideId } = req.params;

    const notifications = await Notification.find({
      guideId: guideId,
      eventType: {
        $in: ["BookingRequest", "BookingCancelled"],
      },
    });

    if (notifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for this guide.",
      });
    }

    res.status(200).json({
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching notifications" });
  }
};
const getTravelerNotifications = async (req, res) => {
  try {
    const { travelerId } = req.params;

    const notifications = await Notification.find({
      travelerId: travelerId,
      eventType: {
        $in: ["BookingConfirmation", "BookingCancelled", "BookingCompleted"],
      },
    });

    if (notifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for this guide.",
      });
    }

    res.status(200).json({
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching notifications" });
  }
};

module.exports = {
  createNotification,
  getGuideNotifications,
  getTravelerNotifications,
};
