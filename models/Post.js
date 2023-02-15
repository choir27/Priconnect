const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

    name: {
        type: String,
        trime: true
    },
    
    text: {
        type: String,
        index: true
    },

    image: {
        type: String,
        trime: true
    },

    cloudinaryId: {
      type: String,
    },

    status: {
        type: String,
        default: "public",
        enum: ["public", "private"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", PostSchema)