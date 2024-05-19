const Guide = require("../models/guide.model");
const Traveller = require("../models/traveler.model");
const jwt = require("jsonwebtoken");
const jwtSecret = "access";
const bcrypt = require("bcryptjs");
const emailVerify = require("../models/verifyemail.model");
const sentEmail = require("../Utils/mailTransport");

const generatePin = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

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

    const pin = generatePin();
    console.log(pin);

    const expirationTime = new Date().getTime() + 300000;

    await emailVerify.deleteOne({ email });

    const verify = new emailVerify({
      email,
      verifyPin: pin.toString(),
      PinExpiration: expirationTime,
    });
    const result = await verify.save();

    console.log(result);
    const boilerPlate = `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h2 style="color: #333;">Hello,</h2>
        <p style="color: #333;">Please use the following OTP code to verify your Email address:</p>
        <div style="display: inline-block; background-color: #4caf50; color: #fff; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 20px; font-weight: bold;">${pin}</h3>
        </div>
        <p style="color: #333;">This OTP code will expire after 60 seconds.</p>
        <p style="color: #333;">Thank you!</p>
    </div>`;

    // Send the email
    await sentEmail(email, boilerPlate, "OTP for email verification.");

    res.status(200).json({
      msg: "Email verification pin has been sent. Please check your email!!",
    });
  } catch (err) {
    console.error("Error during traveller signup:", err);
    res.status(500).json({ error: err.message });
  }
};

const travellerverifyPin = async (req, res) => {
  const { pin, firstname, lastname, email, phoneNumber, password } = req.body;
  const checkPin = await emailVerify.findOne({
    email,
    verifyPin: pin.toString(),
  });

  if (!checkPin) {
    return res.status(400).json({ msg: "Invalid Pin or Email" });
  }

  const now = new Date().getTime();
  if (checkPin.resetPinExpiration < now) {
    return res.status(400).json({ msg: "Pin expired" });
  }
  const userType = "traveller";
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Traveller({
    firstname,
    lastname,
    email,
    phoneNumber,
    userType,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(200).json({
    msg: "Pin verified, Traveller Signup Successfully!",
  });
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
    // Check if user already exists in the database
    let existingUser = await Guide.findOne({ email: email });

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

    const pin = generatePin();
    console.log(pin);

    const expirationTime = new Date().getTime() + 300000;

    await emailVerify.deleteOne({ email });

    const verify = new emailVerify({
      email,
      verifyPin: pin.toString(),
      PinExpiration: expirationTime,
    });
    const result = await verify.save();

    console.log(result);
    const boilerPlate = `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h2 style="color: #333;">Hello,</h2>
        <p style="color: #333;">Please use the following OTP code to verify your Email address:</p>
        <div style="display: inline-block; background-color: #4caf50; color: #fff; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 20px; font-weight: bold;">${pin}</h3>
        </div>
        <p style="color: #333;">Please Wait until you get the email of guide verification. </p>
        <p style="color: #333;">This OTP code will expire after 60 seconds.</p>
        <p style="color: #333;">Thank you!</p>
    </div>`;

    // Send the email
    await sentEmail(email, boilerPlate, "OTP for email verification.");

    res.status(200).json({
      msg: "Email verification pin has been sent. Please check your email!!",
    });
  } catch (err) {
    console.error("Error during guide signup:", err);
    res.status(500).json({ error: err.message });
  }
};

const guideverifyPin = async (req, res) => {
  const {
    pin,
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

  const checkPin = await emailVerify.findOne({
    email,
    verifyPin: pin.toString(),
  });

  if (!checkPin) {
    return res.status(400).json({ msg: "Invalid Pin or Email" });
  }

  const now = new Date().getTime();
  if (checkPin.resetPinExpiration < now) {
    return res.status(400).json({ msg: "Pin expired" });
  }

  const userType = "guide";
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

  res.json({ message: "Pin verified!, Guide Signup Successful!" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }

    let user = await Traveller.findOne({ email: email });

    if (!user) {
      user = await Guide.findOne({ email: email });
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    if (user.userType === "guide" && user.verification !== "Verified") {
      return res.status(403).json({
        msg: "Your account is not verified. Please wait until verified.",
      });
    }
    let tokenData = {
      id: user._id,
      firstname: user.firstname,

      userType: user.userType,
    };
    const token = jwt.sign(tokenData, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({
      token,
    });
    console.log(token, "logged in successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyGuide = async (req, res) => {
  const { guideId } = req.params;
  const { verificationStatus } = req.body;

  try {
    const guide = await Guide.findByIdAndUpdate(
      guideId,
      { verification: verificationStatus },
      { new: true }
    );

    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    if (verificationStatus == "Verified") {
      const email = guide.email;
      const boilerPlate = `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
      <h2 style="color: #333;">Hello ${guide.firstname} ${guide.lastname},</h2>
      <p style="color: #333;">Your guide verification has been approved.</p>
      <p style="color: #333;">Congratulations! You can now start offering your guide services.</p>
      <p style="color: #333;">Thank you!</p>
      </div>`;

      // Send the email
      await sentEmail(email, boilerPlate, "Guide Verification Approved.");
    }

    res.status(200).json({
      message: `Guide verification status updated to ${verificationStatus}`,
      guide,
    });
    console.log(
      `Guide verification status updated for guide ID ${guideId} to ${verificationStatus}`
    );
  } catch (error) {
    console.error("Error updating guide verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createGuide,
  createTraveller,
  login,
  travellerverifyPin,
  guideverifyPin,
  verifyGuide,
};
