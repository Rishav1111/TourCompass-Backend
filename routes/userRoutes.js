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
  changePassword,
  deleteTraveller,
  deleteGuide,
} = require("../controllers/profile");
const authUser = require("../middleware/auth");

// Routes
userRouter.post("/signupGuide", createGuide);
userRouter.post("/signupTraveller", createTraveller);
userRouter.post("/login", login);
userRouter.put("/updateGuide/:id", authUser, updateGuide);
userRouter.put("/updateTraveller/:id", authUser, updateTraveller);
userRouter.get("/getTraveller/:id", authUser, getTraveller);
userRouter.get("/getGuide/:id", authUser, getGuide);
userRouter.put("/changePassword/:id", authUser, changePassword);
userRouter.delete("/deleteTraveller/:id", authUser, deleteTraveller);
userRouter.delete("/deleteGuide/:id", authUser, deleteGuide);
userRouter.post("/travellerverifyPin", travellerverifyPin);
userRouter.post("/guideverifyPin", guideverifyPin);

module.exports = userRouter;
