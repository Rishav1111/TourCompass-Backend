const mainRouter = require("express").Router();

const userRouter = require("./user.routes");
const forgetRouter = require("./forget.routes");
const adminRouter = require("./admin.routes");
const searchRouter = require("./autocomplete.routes");
const BookingRouter = require("./booking.routes");
const destinationRouter = require("./destination.routes");
const saveLocation = require("./userLocation.route");
mainRouter
  .use(userRouter)
  .use(forgetRouter)
  .use(adminRouter)
  .use(searchRouter)
  .use(BookingRouter)
  .use(destinationRouter)
  .use(saveLocation);

module.exports = mainRouter;
