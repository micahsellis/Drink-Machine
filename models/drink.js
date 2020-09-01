const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema({
    idDrink: String,
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Alcoholic', 'Non alcoholic', 'Optional alcohol'],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    drinkImg: String,
    ingredient1: {
        type: String,
        required: true
    },
    ingredient2: String,
    ingredient3: String,
    ingredient4: String,
    ingredient5: String,
    ingredient6: String,
    ingredient7: String,
    ingredient8: String,
    ingredient9: String,
    ingredient10: String,
    ingredient11: String,
    ingredient12: String,
    ingredient13: String,
    ingredient14: String,
    ingredient15: String,
    measure1: {
        type: String,
        required: true
    },
    measure2: String,
    measure3: String,
    measure4: String,
    measure5: String,
    measure6: String,
    measure7: String,
    measure8: String,
    measure9: String,
    measure10: String,
    measure11: String,
    measure12: String,
    measure13: String,
    measure14: String,
    measure15: String,
    author: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Drink', drinkSchema)