const { Router } = require('express');
const { getReviews } = require('../controllers/reviewsController')
const router = Router();

router.get('/', getReviews)

module.exports = router