const mainRouter = require("express").Router();

const userRouter = require("./user.routes");
const forgetRouter = require("./forget.routes");
const adminRouter = require("./admin.routes");

mainRouter.use(userRouter).use(forgetRouter).use(adminRouter);

module.exports = mainRouter;
