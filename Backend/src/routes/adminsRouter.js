const { Router } = require('express');
const { getAdmins, postAdmins, putAdmins, deleteAdmins, getAdminById } = require('../controllers/adminsController')
const router = Router();

router.get('/', getAdmins)
router.get('/:id', getAdminById)
router.post('/', postAdmins)
router.put('/:id', putAdmins)
router.delete('/:id', deleteAdmins)

module.exports = router