const express = require("express");
const userRouter = express.Router();
const {
  createGuide,
  createTraveller,
  login,
  updateTraveller,
  updateGuide,
  deleteTraveler,
  deleteGuide,
} = require("../controllers/user");

// Routes
userRouter.post("/signupGuide", createGuide);
userRouter.post("/signupTraveller", createTraveller);
userRouter.post("/login", login);
userRouter.put("/updateGuide/:id", updateGuide);
userRouter.put("/updateTraveller/:id", updateTraveller);
userRouter.delete("/deleteTraveller/:id", deleteTraveler);
userRouter.delete("/deleteGuide/:id", deleteGuide);

module.exports = userRouter;
