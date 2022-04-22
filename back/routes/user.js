const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rateLimit = require("express-rate-limit");

const userCtrl = require("../controllers/user");

const passLimit = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes temps pour tester l'application
  max: 50, // essais max par adresse ip
});

router.post("/signup", userCtrl.signup);
router.post("/login", passLimit, userCtrl.login);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
