const express = require("express");
const router = express.Router();
const mainController = require("../controllers/post");
const multer = require("multer");


const storage = multer.diskStorage({
    filename: (req,file,cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, fileName);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true);   
    }
});

router.post("/post", upload.single("file"), mainController.postDrawing);

module.exports = router;