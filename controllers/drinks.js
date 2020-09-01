const request = require('request')
const Drink = require('../models/drink')
const Review = require('../models/reviews')

module.exports = {
    home,
    list,
    create,
    search,
    details,
    delete: deleteDrink,
    new: newDrink
}

const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

function home(req, res) {
    request(randomDrink, (err, response, body) => {
        const newDrink = JSON.parse(body).drinks[0]
        Drink.find({})
            .then(myDrinks => {
                myDrinks.sort((a, b) => a.name.localeCompare(b.name))
                res.render('index', {
                    title: 'Home',
                    newDrink,
                    body: 'search drinks',
                    myDrinks
                    })
                })
            .catch(err => console.log(err))
    })
}

function create(req, res) {
    req.body.drinkID = null
    req.body.idUser = req.user.id
    req.body.author = req.user.name
    const drink = new Drink(req.body)
    drink.save()
        .then(drink => res.redirect('/'))
        .catch(err => console.log(err))
}

function search(req, res) {
    request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.search}`, (err, response, doc) => {
        if (err) console.log(err)
        const drinks = JSON.parse(doc).drinks
        if (drinks == null) {
            res.render('drinks/oops', {
                title: '404 Drink not found',
                body: req.body.search
            })
        }
        res.render('drinks/results', {
           title: 'Search Results',
            drinks,
            body: req.body.search
        })
    })
}

function details(req, res) {
    if (req.params.id.length < 20) {
        request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.id}`, (err, response, doc) => {
            if (err) console.log(err)
            const drinkAPI = JSON.parse(doc).drinks[0]
            Review.find({ idDrink: req.params.id })
                .then(reviews => {
                    res.render('drinks/details', {
                        title: drinkAPI.name,
                        drinkAPI,
                        drink: null,
                        body: 'Search',
                        reviews
                    })
                })
                .catch(err => console.log(err))
        })
    } else {
        Drink.findById(req.params.id)
            .then(drink => {
                Review.find({ idDrink: drink.idDrink })
                    .then(reviews => {
                        res.render('drinks/details', {
                            title: drink.name,
                            drink,
                            drinkAPI: null,
                            body: 'Search',
                            reviews
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}

function newDrink(req, res) {
    res.render('drinks/new', {
        title: 'Create New Drink',
        body: 'Search'
    })
}

function deleteDrink(req, res) {
    Drink.findByIdAndDelete(req.params.id)
        .then(docs => {
            console.log("Deleted: ", docs)
            res.redirect('/')
            .catch(err => console.log(err))
        })
}

function list(req, res) {
    Drink.find({ idUser: req.user.id })
        .then(drinks => {
            res.render('drinks/list', {
                title: `${req.user.name}'s Drinks`,
                drinks,
                body: 'Search',
            })
        })
        .catch(err => console.log(err))
}