const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
router.post("/request",paymentController.paymentrequest);
router.get("/payment",paymentController.getrequest);
router.patch("/payment/:id",paymentController.resultrequest);
router.post("/payment/reset",paymentController.resetrequest);
module.exports = router;
