const router = require('express').Router();
const drinksCtrl = require('../controllers/drinks');
const Drink = require('../models/drink');
const drinks = require('../controllers/drinks');
const { create } = require('../models/drink');

router.get('/list', drinksCtrl.list)
router.get('/new', drinksCtrl.new)
router.get('/details/:id', drinksCtrl.details)
router.get('/update/:id', drinksCtrl.update)
router.post('/new', () => {
    const drink = new Drink(req.body)
    drink.idDrink = Date.now().toString()
    drink.idUser = "101"
    drink.author = "Test"
    drink.save()
        .then(drink => res.redirect('/'))
        .catch(err => console.log(err))
})
router.post('/results', drinksCtrl.search)
router.put('/update/:id', drinksCtrl.put)
router.delete('/delete/:id', drinksCtrl.delete)

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect('/auth/google');
// }

module.exports = router