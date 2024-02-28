const jwt = require("jsonwebtoken");
const jwtSecret = "access";

const bcrypt = require("bcryptjs");
const sentEmail = require("../Utils/mailTransport");
const Traveller = require("../models/traveler.model");
const Guide = require("../models/guide.model");

const FORGETPASSWORD = async (req, res) => {
  try {
    const { email } = req.body;

    const traveller = await Traveller.findOne({ email });
    const guide = await Guide.findOne({ email });

    if (!traveller && !guide) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = traveller || guide;

    const generatePin = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };

    const pin = generatePin();
    console.log(pin);

    const expirationTime = new Date().getTime() + 30000;

    const updateUser = await (traveller ? Traveller : Guide).findOneAndUpdate(
      { email },
      {
        $set: {
          resetPin: pin.toString(),
          resetPinExpiration: expirationTime,
        },
      },
      { new: true, runValidators: true }
    );

    // Construct the email template
    const boilerPlate = `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h2 style="color: #333;">Hello,</h2>
        <p style="color: #333;">You have requested to reset your password. Please use the following OTP code to proceed:</p>
        <div style="display: inline-block; background-color: #4caf50; color: #fff; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 24px; font-weight: bold;">${pin}</h3>
        </div>
        <p style="color: #333;">This OTP code will expire after 60 seconds.</p>
        <p style="color: #333;">Thank you!</p>
    </div>`;

    // Send the email
    await sentEmail(email, boilerPlate, "OTP for password reset");

    res.status(200).json({
      msg: "Password reset email pin has been sent. Please check your email!!",
      pin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyPin = async (req, res) => {
  const { pin, email } = req.body;
  const user =
    (await await Traveller.findOne({ email, resetPin: pin.toString() })) ||
    (await Guide.findOne({ email, resetPin: pin.toString() }));

  if (!user) {
    return res.status(400).json({ msg: "Invalid Pin or Email" });
  }

  const now = new Date().getTime();
  if (user.resetPinExpiration < now) {
    return res.status(400).json({ msg: "Pin expired" });
  }

  const payload = {
    role: user instanceof Traveller ? "traveller" : "guide",
    id: user._id,
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1hr" });
  res.status(200).json({
    msg: "Pin verified",
    token,
  });
};

// Reset User's Password using PIN
const resetPassword = async (req, res) => {
  const { email, newpassword } = req.body;
  const user =
    (await await Traveller.findOne({ email })) ||
    (await Guide.findOne({ email }));

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newpassword, 10);
  const updatedUser = await (user instanceof Traveller
    ? Traveller
    : Guide
  ).findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } },
    { new: true, runValidators: true }
  );
  console.log(updatedUser);
  res.status(200).json({ msg: "Password reset successful" });
};

module.exports = { FORGETPASSWORD, verifyPin, resetPassword };
