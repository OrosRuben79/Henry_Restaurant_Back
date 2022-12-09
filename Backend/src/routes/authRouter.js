const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/authController");
const { validatorMiddlewere } = require("../middlewares/validator-middleweres");

const router = Router();

router.post(
  "/login",
  [
    check("email", "email required").isEmail(),
    check("password", "password required").not().isEmpty(),
    validatorMiddlewere,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "id_token es necesario").not().isEmpty(),
    validatorMiddlewere,
  ],
  googleSingIn
);

module.exports = router;
