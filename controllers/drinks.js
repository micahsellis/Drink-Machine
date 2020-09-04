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
    new: newDrink,
    update,
    put
}

const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

function home(req, res) {
    request(randomDrink, (err, response, body) => {
        if (err) console.log(err)
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
    const drink = new Drink(req.body)
    drink.idDrink = Date.now().toString()
    drink.idUser = req.user.id
    drink.author = req.user.name
    drink.save()
        .then(drink => res.redirect('/'))
        .catch(err => console.log(err))
}

function search(req, res) {
    let regex = new RegExp(`${req.body.search}`, 'i')
    Drink.find({ name: regex })
        .then(docs => {
            request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.search}`, (err, response, doc) => {
                if (err) console.log(err)
                const drinks = JSON.parse(doc).drinks
                if (drinks == null && docs.length < 1) {
                    res.render('drinks/oops', {
                        title: '404 Drink not found',
                        body: req.body.search
                    })
                }
                res.render('drinks/results', {
                    title: 'Search Results',
                    drinks,
                    docs,
                    body: req.body.search
                })
            })
})
}

function details(req, res) {
    if (req.params.id.length < 13) {
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
        Drink.find({idDrink: req.params.id})
            .then(drink => {
                Review.find({ idDrink: req.params.id })
                    .then(reviews => {
                        res.render('drinks/details', {
                            title: drink.name,
                            drink: drink[0],
                            drinkAPI: null,
                            body: 'Search',
                            reviews,
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
        })
        .catch(err => console.log(err))
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

function update(req, res) {
    Drink.find({ _id: req.params.id })
        .then(drink => {
            // if (drink.idUser == req.user.id) {
                console.log(drink)
                res.render('drinks/update', {
                    title: `Update ${drink.name}`,
                    drink: drink[0],
                    body: 'Search',
                })
            // } else {
            //     res.redirect('/drinks/list')
            // }
        })
        .catch(err => console.log(err))
}

function put(req, res) {
    Drink.findByIdAndUpdate(req.params.id, req.body)
        .then(doc => {
            res.redirect('/drinks/list')
        })
        .catch(err => console.log(err))
}