const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const passport = require("passport");
const app = express();

router.get("/", authController.getAuth);
router.get("/callback", authController.getCallback);

app.use(passport.initialize());
app.use(passport.session());

router.get("/logout", authController.getLogout);

module.exports = router;