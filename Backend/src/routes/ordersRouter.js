const { Router } = require('express');
const { getOrders, postOrders, deleteOrders, putOrders, getOrdersUserid } = require('../controllers/ordersController')
const router = Router();

router.get('/', getOrders)
router.get('/:id', getOrdersUserid)
router.post('/', postOrders)
router.put('/', putOrders)
router.delete('/:id', deleteOrders)

module.exports = router