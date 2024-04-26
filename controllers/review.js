const Review = require("../models/reviews.model");

const createReview = async (req, res) => {
  try {
    const { travelerId, guideId, message, rating } = req.body;
    if (!travelerId || !guideId || !message || !rating) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const newReview = new Review({
      travelerId,
      guideId,
      message,
      rating,
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const newData = req.body;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, newData, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);

    // Return a 500 error response for internal server error
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve reviews" });
  }
};

const getReviewsbyGuideId = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ guideId: id });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReviewsbyGuideId,
  deleteReview,
};
