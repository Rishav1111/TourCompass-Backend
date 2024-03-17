const mainRouter = require("express").Router();

const userRouter = require("./user.routes");
const forgetRouter = require("./forget.routes");
const adminRouter = require("./admin.routes");
const searchRouter = require("./autocomplete.routes");

mainRouter.use(userRouter).use(forgetRouter).use(adminRouter).use(searchRouter);

module.exports = mainRouter;
