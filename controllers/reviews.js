const Review = require('../models/reviews')

module.exports = {
    create,
    delete: deleteReview,
    edit
}

function create(req, res) {
    req.body.idDrink = req.params.id
    req.body.author = req.user.name
    req.body.idUser = req.user._id
    const review = new Review(req.body)
    console.trace("youre in the create function")
    review.save()
        .then(() => res.redirect(`/drinks/details/${req.params.id}`))
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