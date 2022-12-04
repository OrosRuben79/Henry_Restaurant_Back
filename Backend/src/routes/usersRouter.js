const { Router } = require('express');
const { getUsers } = require('../controllers/usersContoller')
const router = Router();

router.get('/', getUsers)

module.exports = router