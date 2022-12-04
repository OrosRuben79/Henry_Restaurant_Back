const { Router } = require('express');

const usersRouter = require('./usersRouter');
const foodsRouter = require('./foodsRouter');

const router = Router();

router.use('/users', usersRouter)
router.use('/foods', foodsRouter)

module.exports = router;