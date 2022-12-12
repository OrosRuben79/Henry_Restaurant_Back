const { Router } = require('express');
const { getOrders, postOrders, deleteOrders, putOrders } = require('../controllers/ordersController')
const router = Router();

router.get('/', getOrders)
router.post('/', postOrders)
router.put('/:id', putOrders)
router.delete('/:id', deleteOrders)

module.exports = router