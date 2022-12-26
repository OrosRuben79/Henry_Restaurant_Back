const { Router } = require('express');
const { pagarProducto } = require('../controllers/productsController');
const router = Router();

router.post('/:id', pagarProducto)

module.exports = router