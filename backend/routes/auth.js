const router = require("express").Router();
const authController = require("../controllers/auth");

router.post('/google', authController.getToken);
router.post('/google/login', authController.loginUser);
router.post('/google/refresh-token', authController.refreshToken);

module.exports = router;