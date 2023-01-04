const { Router } = require('express');
const { getTags, postTags } = require('../controllers/tagsController')
const router = Router();

router.get('/', getTags)
router.post('/', postTags)

module.exports = router