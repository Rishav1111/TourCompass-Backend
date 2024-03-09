const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = "access";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "please add email or password" });
    }

    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(403).json({ error: "Admin User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userType = "admin";
    const adminUser = new Admin({
      email,
      password: hashedPassword,
      userType,
    });
    await adminUser.save();
    return res.status(201).json({
      message: "Admin user created successfully!",
    });
  } catch (error) {
    res.status(500).send(`Error -> ${error}`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: "Invalid user credentials!" });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(422).json({ error: "Admin User not found!" });
  }
  console.log(email, password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid email or password." });
  }

  let tokenData = {
    id: user._id,
    userType: user.userType,
  };
  const token = jwt.sign(tokenData, jwtSecret, {
    expiresIn: "1h",
  });
  res.status(200).json({
    message: "Logged In Successfully!",
    token,
  });
};

module.exports = { register, login };
