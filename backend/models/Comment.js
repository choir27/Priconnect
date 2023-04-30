const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {
        type: String
    },
    postId: {
        type: String
    },  
    email: {
        type: String
    },
    displayName: {
        type: String
    },
    likes: {
        type: Number
    },
    comment: {
        type: String
    },
    replies: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Comment", CommentSchema);