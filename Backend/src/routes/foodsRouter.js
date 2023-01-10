const { Router } = require('express');

const { getFoods, postFoods, putFoods, deleteFoods, updateImg } = require('../controllers/foodsController')

const router = Router();

router.get('/', getFoods)
router.post('/', postFoods)
router.put('/:id', putFoods)
router.put('/foodUpdate/:id', updateImg)
router.delete('/:id', deleteFoods)


module.exports = router