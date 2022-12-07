const { Router } = require("express");
const { getUser, postUser, putUser,delteUser } = require("../controllers/usersContoller");
const router = Router();

router.get("/", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", delteUser);

module.exports = router;
