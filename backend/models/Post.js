const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String
    },
    post:{
        type: String
    },
    cloudinaryID:{
        type: String
    },
    user: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Post", PostSchema);