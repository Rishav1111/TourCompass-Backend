const express = require("express");
const userRouter = express.Router();
const {
  createGuide,
  createTraveller,
  login,
  travellerverifyPin,
  guideverifyPin,
} = require("../controllers/auth_user");

const {
  updateTraveller,
  updateGuide,
  getTraveller,
  getGuide,
  deleteTraveller,
  deleteGuide,
} = require("../controllers/profile");
// Routes
userRouter.post("/signupGuide", createGuide);
userRouter.post("/signupTraveller", createTraveller);
userRouter.post("/login", login);
userRouter.put("/updateGuide/:id", updateGuide);
userRouter.put("/updateTraveller/:id", updateTraveller);
userRouter.get("/getTraveller/:id", getTraveller);
userRouter.get("/getGuide/:id", getGuide);
userRouter.delete("/deleteTraveller/:id", deleteTraveller);
userRouter.delete("/deleteGuide/:id", deleteGuide);
userRouter.post("/travellerverifyPin", travellerverifyPin);
userRouter.post("/guideverifyPin", guideverifyPin);

module.exports = userRouter;
