const router = require('express').Router();
const drinksCtrl = require('../controllers/drinks');

router.get('/list', drinksCtrl.list)
router.get('/new', drinksCtrl.new)
router.get('/details/:id', drinksCtrl.details)
router.get('/update/:id', drinksCtrl.update)
router.post('/new', isLoggedIn, drinksCtrl.create)
router.post('/results', drinksCtrl.search)
router.delete('/delete/:id', drinksCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router