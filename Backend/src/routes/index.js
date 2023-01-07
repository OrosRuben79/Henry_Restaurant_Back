const { Router } = require('express');

const usersRouter = require('./usersRouter');
const foodsRouter = require('./foodsRouter');
const reviewsRouter = require('./reviewsRouter');
const adminsRouter = require('./adminsRouter');
const rolesRouter = require('./rolesRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./authRouter');
const tagsRouter = require('./tagsRouter');
const paymentRouter = require('./paymentRouter')
const uploadRouter = require('./uploadRouter')

const router = Router();

router.use('/users', usersRouter)
router.use('/foods', foodsRouter)
router.use('/reviews', reviewsRouter)
router.use('/admins', adminsRouter)
router.use('/roles', rolesRouter)
router.use('/orders', ordersRouter)
router.use('/auth', authRouter)
router.use('/tags', tagsRouter)
router.use('/payment', paymentRouter)
router.use('/upload', uploadRouter)


module.exports = router;