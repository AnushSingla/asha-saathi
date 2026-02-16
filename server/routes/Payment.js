const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");

router.post("/request", verifyToken, paymentController.paymentrequest);
router.get("/payment", verifyToken, requireAdmin, paymentController.getrequest);
router.get("/payment/me", verifyToken, paymentController.getMyPayment);
router.patch("/payment/:id", verifyToken, requireAdmin, paymentController.resultrequest);
router.post("/payment/reset", verifyToken, paymentController.resetrequest);
module.exports = router;
