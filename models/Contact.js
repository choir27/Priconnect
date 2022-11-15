const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true
    },
    email: {
        type: String,
        required: true,
        trime: true
    },
    text: {
        type: String,
        required: true,
        trime: true,
    },
    createdAt: {
        type: Date,
        default: Date.now //puts the date
    }
})

module.exports = mongoose.model('Contact', ContactSchema)