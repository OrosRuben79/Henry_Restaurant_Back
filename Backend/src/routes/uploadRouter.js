const { Router } = require('express');
const { imgUploader ,imgDelete} = require('../controllers/uploaderController')
const router = Router();

router.post('/', imgUploader)
router.delete('/', imgDelete)

module.exports = router