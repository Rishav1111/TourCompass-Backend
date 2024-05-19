const Review = require("../models/reviews.model");
const Traveler = require("../models/traveler.model");

const createReview = async (req, res) => {
  try {
    const { travelerId, guideId, feedback, rating } = req.body;
    if (!travelerId || !guideId || !feedback || !rating) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const newReview = new Review({
      travelerId,
      guideId,
      feedback,
      rating,
    });

    await newReview.save();

    res.status(201).json(newReview);
    console.log(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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

    // Fetch reviews for the given guide ID and populate traveler details
    const reviews = await Review.find({ guideId: id }).populate(
      "travelerId",
      "firstname lastname"
    );

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No Reviews Found!" });
    }

    // Map the reviews to include traveler details
    const reviewDetails = reviews.map((review) => {
      return {
        firstname: review.travelerId.firstname,
        lastname: review.travelerId.lastname,
        rating: review.rating,
        feedback: review.feedback,
      };
    });

    res.status(200).json({ reviews: reviewDetails });
  } catch (error) {
    console.error("Error fetching reviews by guide ID:", error);
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

const countReviews = async (req, res) => {
  try {
    const count = await Review.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReviewsbyGuideId,
  deleteReview,
  countReviews,
};
