const { Router } = require('express');
const { getReviews, postReviews, putReviews } = require('../controllers/reviewsController')
const router = Router();

router.get('/', getReviews)
router.post('/', postReviews)
router.put('/:id', putReviews)
// router.delete('/:id', deleteReviews)

module.exports = router