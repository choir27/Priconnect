const router = require("express").Router();
const authController = require("../controllers/auth");

router.post('/google', authController.getToken);
router.delete('/google/logout/:id', authController.logoutUser);
router.post('/google/login', authController.loginUser);
router.post('/google/refresh-token', authController.refreshToken);

module.exports = router;