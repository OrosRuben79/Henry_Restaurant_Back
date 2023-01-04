const { Router } = require('express');
const { check } = require("express-validator");
const { getTags, postTags, putTags, deleteTags } = require('../controllers/tagsController')
const { validatorMiddlewere } = require('../middlewares/validator-middleweres');
const router = Router();

router.get('/', getTags)

router.post('/',[
    check("tagES", "tag en español requerido").not().isEmpty(),
    check("tagEN", "tag en ingles requerido").not().isEmpty(),
    check("type", "typo de la tag requerido requerido").not().isEmpty(),
    validatorMiddlewere

] ,postTags)


router.put('/:id', putTags)
router.delete('/:id', deleteTags)

module.exports = router