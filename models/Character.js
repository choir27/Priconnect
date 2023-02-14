const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        trime: true
    },
    cloudID: {
        type: String,
        trime: true
    },
    image: {
        type: String,
        trime: true
    },
    nickname: {
        type: String,
        trime: true
    },
    guild: {
        type: String,
        trime: true,
    },
    unionName: {
        type: String,
        index: true
    },
    cloudinaryId: {
      type: String,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now //puts the date
    }
})

module.exports = mongoose.model('Character', CharacterSchema)