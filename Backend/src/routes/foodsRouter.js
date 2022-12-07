const { Router } = require('express');

const { getFoods, postFoods, putFoods, deleteFoods } = require('../controllers/foodsController')

const router = Router();

router.get('/', getFoods)
router.post('/', postFoods)
router.put('/:id', putFoods)
router.delete('/:id', deleteFoods)


module.exports = router