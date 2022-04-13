const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
//router.get("/user/:id", auth, userCtrl.getOneUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
