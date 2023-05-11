const router = require("express").Router();
const apiController = require("../controllers/api");

router.get("/users", apiController.getUsers);

router.get("/posts", apiController.getPosts);

module.exports = router;