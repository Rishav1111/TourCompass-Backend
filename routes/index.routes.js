const mainRouter = require("express").Router();

const userRouter = require("./user.routes");
const forgetRouter = require("./forget.routes");
const adminRouter = require("./admin.routes");
const searchRouter = require("./autocomplete.routes");
const BookingRouter = require("./booking.routes");
const destinationRouter = require("./destination.routes");
const saveLocation = require("./userLocation.route");
const reviewRouter = require("./review.routes");
const notificationRouter = require("./notification.routes");
const paymentRouter = require("./payment.routes");

// all the routes
mainRouter
  .use(userRouter)
  .use(forgetRouter)
  .use(adminRouter)
  .use(searchRouter)
  .use(BookingRouter)
  .use(destinationRouter)
  .use(saveLocation)
  .use(reviewRouter)
  .use(notificationRouter)
  .use(paymentRouter);

module.exports = mainRouter;
