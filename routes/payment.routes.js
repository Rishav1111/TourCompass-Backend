const express = require("express");
const router = express.Router();

const { confirmPayment } = require("../controllers/payment");

router.post("/payment/confirm", confirmPayment);

module.exports = router;
