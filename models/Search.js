const mongoose = require('mongoose')

const SearchSchema = new mongoose.Schema({
    search: {
        type: String,
        required: true,
        trime: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now //puts the date
    }
})

module.exports = mongoose.model('Search', SearchSchema)