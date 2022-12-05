const { Router } = require('express');
const { getOrders } = require('../controllers/ordersController')
const router = Router();

router.get('/', getOrders)

module.exports = router