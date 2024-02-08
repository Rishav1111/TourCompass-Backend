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
    if (!email || !password || !confirmPassword) {
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
      confirmPassword: hashedPassword,
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

    if (!email || !password || !confirmPassword) {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new guide object
    const newGuide = new Guide({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
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
    console.log(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createGuide, createTraveller, login, deleteUser };
