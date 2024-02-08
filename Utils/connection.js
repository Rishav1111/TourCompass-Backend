const mongoose = require("mongoose");

const connectDatabase = async (URI) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

const mongoURI =
  "mongodb+srv://rishav:poldfwlhgJoa3MOc@cluster0.l9sop0d.mongodb.net/TourCompass";

connectDatabase(mongoURI);

module.exports = connectDatabase;
