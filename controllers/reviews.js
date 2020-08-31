const Drink = require('../models/drink')

module.exports = {
    create,
    delete: deleteReview,
    edit
}

function create(req, res) {
    Drink.findById(req.params.id)
        .then(drink => {
            drink.review.push(req.body)
            drink.save()
                .then(() => res.redirect(`/drinks/${drink._id}`))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

function deleteReview(req, res) {
    Drink.findById(req.params.drink)
        .then(drink => {
            let idx = drink.reviews.findIndex(review => review._id == req.params.review)
            drink.reviews.splice(idx, 1)
            drink.save()
                .then(res.redirect(`/drinks/${req.params.drink}`))
                .catch(err => console.log(err))
        })
    .catch(err => console.log(err))
}

function edit(req, res) {
    
}