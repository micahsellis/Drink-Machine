const Review = require('../models/reviews')

module.exports = {
    create,
    delete: deleteReview,
    edit
}

function create(req, res) {
    const review = new Review(req.body)
    review.idDrink = req.params.id
    review.author = req.user.name
    review.idUser = req.user._id
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