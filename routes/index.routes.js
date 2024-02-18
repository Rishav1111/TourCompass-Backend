const mainRouter = require("express").Router();

const userRouter = require("./userRoutes");
const forgetRouter = require("./forget.routes");

mainRouter.use(userRouter).use(forgetRouter);

module.exports = mainRouter;
