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
  getAllTraveller,
  getAllGuide,
  getTraveller,
  getGuidebySearch,
  getGuide,
  changePassword,
  deleteTraveller,
  deleteGuide,
  countTravelers,
  countGuides,
} = require("../controllers/profile");
const {
  tokenExtractor,
  authUser,
  adminScope,
} = require("../middleware/token_auth");

// Routes for login and sigup as a Traveller or Guide
userRouter.post("/signupGuide", createGuide);
userRouter.post("/signupTraveller", createTraveller);
userRouter.post("/login", login);

//Routes for update  profile information of both travellers and guides
userRouter.put("/updateGuide/:id", tokenExtractor, authUser, updateGuide);
userRouter.put(
  "/updateTraveller/:id",
  tokenExtractor,
  authUser,
  updateTraveller
);

//Routes for getting the profile information of both travellers and guides
userRouter.get("/getAllTraveller", tokenExtractor, adminScope, getAllTraveller);
userRouter.get("/getAllGuide", tokenExtractor, adminScope, getAllGuide);
userRouter.get("/getGuideBySearch", tokenExtractor, authUser, getGuidebySearch);
userRouter.get("/getTraveller/:id", tokenExtractor, authUser, getTraveller);
userRouter.get("/getGuide/:id", tokenExtractor, authUser, getGuide);

//Route for change password
userRouter.put("/changePassword/:id", tokenExtractor, authUser, changePassword);

//Routes for deleting the profile of traveller and guide
userRouter.delete(
  "/deleteTraveller/:id",
  tokenExtractor,
  authUser,
  deleteTraveller
);
userRouter.delete("/deleteGuide/:id", tokenExtractor, authUser, deleteGuide);

//Routes for verifying the  traveller and guide
userRouter.post("/travellerverifyPin", travellerverifyPin);
userRouter.post("/guideverifyPin", guideverifyPin);

userRouter.get("/travelers/count", countTravelers);
userRouter.get("/guides/count", countGuides);
module.exports = userRouter;
