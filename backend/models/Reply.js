const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
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
    replies: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Reply", ReplySchema);