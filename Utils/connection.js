const mongoose = require("mongoose");

const URI =
  "mongodb+srv://rishav:poldfwlhgJoa3MOc@cluster0.l9sop0d.mongodb.net/TourCompass";

const connectDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

module.exports = connectDatabase;
