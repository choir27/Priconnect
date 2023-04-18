const router = require("express").Router();
const apiController = require("../controllers/api");

router.get("/users", apiController.getUsers);

module.exports = router;