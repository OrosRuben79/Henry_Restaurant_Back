const { Router } = require("express");

const { paymentWithStripe } = require("../controllers/paymentsController")

const router = Router();

router.post('/payment-stripe', paymentWithStripe);

module.exports = router;