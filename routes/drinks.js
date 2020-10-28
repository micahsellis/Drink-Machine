const router = require('express').Router();
const drinksCtrl = require('../controllers/drinks');
const drink = require('../models/drink');
const drinks = require('../controllers/drinks');
const { create } = require('../models/drink');

router.get('/list', drinksCtrl.list)
router.get('/new', drinksCtrl.new)
router.get('/details/:id', drinksCtrl.details)
router.get('/update/:id', isLoggedIn, drinksCtrl.update)
router.post('/new', isLoggedIn, () => {
    const drink = new Drink(req.body)
    drink.idDrink = Date.now().toString()
    drink.idUser = req.user.id
    drink.author = req.user.name
    drink.save()
        .then(drink => res.redirect('/'))
        .catch(err => console.log(err))
})
router.post('/results', drinksCtrl.search)
router.put('/update/:id', isLoggedIn, drinksCtrl.put)
router.delete('/delete/:id', drinksCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router