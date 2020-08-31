const request = require('request')
const Drink = require('../models/drink')

const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

function index(req, res) {
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
            res.render('drinks/details', {
                title: drinkAPI.name,
                drinkAPI,
                drink: null,
                body: 'Search'
            })
        })
    } else {
        Drink.findById(req.params.id)
            .then(drink => {
                res.render('drinks/details', {
                    title: drink.name,
                    drink,
                    drinkAPI: null,
                    body: 'Search'
                })
            })
            .catch(err => console.log(err))
    }
}

function oops(req, res) {
    console.log('oops')
}

function create(req, res) {
    const drink = new drink(req.body);
    drink.save()
        .then(index(req, res))
        .catch(err => console.log(err))
}

function deleteDrink(req, res) {
    Drink.findByIdAndDelete(req.params.id)
        .then(docs => {
            console.log("Deleted: ", docs)
            res.redirect('/')
            .catch(err => console.log(err))
        })
}

module.exports = {
    index,
    create,
    search,
    oops,
    details,
    delete: deleteDrink
}