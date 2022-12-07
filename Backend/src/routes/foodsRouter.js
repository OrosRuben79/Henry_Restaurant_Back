const { Router } = require('express');

const { getFoods } = require('../controllers/foodsController')

const router = Router();

router.get('/', getFoods)

module.exports = router