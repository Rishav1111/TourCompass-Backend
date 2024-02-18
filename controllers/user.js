const Guide = require("../models/guide.model");
const Traveller = require("../models/traveler.model");
const jwt = require("jsonwebtoken");
const jwtSecret = "access";
const bcrypt = require("bcryptjs");

const createTraveller = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;
    const userType = "traveller";
    // Checking if user already exists in the database
    let existingUser = await Traveller.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }
    if (
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !phoneNumber ||
      !confirmPassword
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Traveller({
      firstname,
      lastname,
      email,
      phoneNumber,
      userType,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("Traveller created successfully:", savedUser);

    res.status(200).json({ message: "Signup Successful!" });
  } catch (err) {
    console.error("Error during traveller signup:", err);
    res.status(500).json({ error: err.message });
  }
};

const createGuide = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPassword,
      licenseNumber,
      expertPlace,
      guidePrice,
      bio,
      licensePhoto,
      guidePhoto,
    } = req.body;

    const userType = "guide";

    if (
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !phoneNumber ||
      !confirmPassword ||
      !licenseNumber ||
      !expertPlace ||
      !guidePrice ||
      !bio ||
      !licensePhoto ||
      !guidePhoto
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    // Check if user already exists in the database
    let existingUser = await Guide.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newGuide = new Guide({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      licenseNumber,
      expertPlace,
      guidePrice,
      licensePhoto,
      guidePhoto,
      bio,
      userType,
    });

    // Save the new guide to the database
    const savedGuide = await newGuide.save();
    console.log("Guide created successfully:", savedGuide);

    res.json({ message: "Signup Successful!" });
  } catch (err) {
    console.error("Error during guide signup:", err);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }

    let user = await Traveller.findOne({ email: email });
    let userType = "traveller";

    if (!user) {
      user = await Guide.findOne({ email: email });
      userType = "guide";
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }
    let tokenData = {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      userType: userType,
    };
    const token = jwt.sign(tokenData, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userType: userType,
      },
    });
    console.log(user.email, "logged in successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTraveller = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phoneNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await Traveller.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phoneNumber, password: hashedPassword },
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
      password,
      licenseNumber,
      expertPlace,
      guidePrice,
      bio,
      licensePhoto,
      guidePhoto,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await Guide.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phoneNumber,
        password: hashedPassword,
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

    res.status(200).json({ updatedUser, msg: "Guide updated successfully." });
  } catch (error) {
    console.error("Error updating guide:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTraveler = async (req, res) => {
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
  createGuide,
  createTraveller,
  login,
  updateTraveller,
  updateGuide,
  deleteTraveler,
  deleteGuide,
};
