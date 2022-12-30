const { Router } = require('express');
const { check } = require("express-validator");

const { getReviews, postReviews, putReviews, deleteReviews } = require('../controllers/reviewsController');
const { scoreValidator, userIDValidator, foodIDValidator } = require('../helpers/db-validators');
const { validatorMiddlewere } = require('../middlewares/validator-middleweres');

const router = Router();

router.get('/', getReviews)

router.post('/',[
   check("userId", "No es un ID valido").isMongoId(),
   check("userId").custom(userIDValidator),
   check("foodId", "No es un ID valido").isMongoId(),
   check("foodId").custom(foodIDValidator),
   check("reviewsDate", "reviewsDate requerido").not().isEmpty(),
   check("reviewsDate").isDate(),
   check("score", "score requerido").not().isEmpty(),
   check("score").custom(scoreValidator),
   validatorMiddlewere


], postReviews)


router.put('/:id', putReviews)
router.delete('/:id', deleteReviews)

module.exports = router