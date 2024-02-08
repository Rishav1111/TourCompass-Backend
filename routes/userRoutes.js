const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createGuide,
  createTraveller,
  login,
  deleteUser,
} = require("../controllers/user");

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

// Multer upload configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.post(
  "/signupGuide",
  upload.fields([
    { name: "licensePhoto", maxCount: 1 },
    { name: "guidePhoto", maxCount: 1 },
  ]),
  createGuide
);
router.post("/signupTraveller", createTraveller);
router.post("/login", login);
router.delete("/delete", deleteUser);

module.exports = router;
