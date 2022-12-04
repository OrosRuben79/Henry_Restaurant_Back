const { Router } = require('express');
const { getFoods } = require('../controllers/foodController')
const router = Router();

router.get('/', getFoods)

module.exports = router