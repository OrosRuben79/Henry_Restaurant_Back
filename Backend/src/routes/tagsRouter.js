const { Router } = require('express');
const { getTags } = require('../controllers/tagsController')
const router = Router();

router.get('/', getTags)

module.exports = router