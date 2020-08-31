const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    details: String,
    idDrink: String,
    Author: String,
    idUser: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema);