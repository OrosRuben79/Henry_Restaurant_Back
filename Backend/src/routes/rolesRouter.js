const { Router } = require('express');
const { getRoles } = require('../controllers/rolesController')
const router = Router();

router.get('/', getRoles)

module.exports = router