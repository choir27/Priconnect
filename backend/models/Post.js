const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String
    },
    post:{
        type: String
    },
    description:{
        type: String
    },
    displayName:{
        type: String
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    fileName:{
        type: String  
    },
    cloudinaryId:{
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