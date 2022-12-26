const { Router } = require('express');
const { getRoles, postRoles, putRoles, deleteRoles } = require('../controllers/rolesController')
const router = Router();

router.get('/', getRoles)
router.post('/', postRoles)
router.put('/:id', putRoles)
router.delete('/:id', deleteRoles)

module.exports = router