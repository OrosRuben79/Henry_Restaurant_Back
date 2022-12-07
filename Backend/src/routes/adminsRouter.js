const { Router } = require('express');
const { getAdmins } = require('../controllers/adminsController')
const router = Router();

router.get('/', getAdmins)

module.exports = router