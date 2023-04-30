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

router.put("/addLike/:id", mainController.addLike);

router.post("/post", upload.single("file"), mainController.createPost);

router.delete("/deletePost/:id", mainController.deletePost);

router.put("/editPost/:id", upload.single("file"), mainController.editPost);

router.post("/addComment/:id", mainController.addComment);

router.delete("/deleteComment/:id/:postId", mainController.deleteComment);

router.put("/addReplies/:id/:postId", mainController.addReply);

router.delete("/deleteReply/:comment/:reply/:post", mainController.deleteReply);

module.exports = router;