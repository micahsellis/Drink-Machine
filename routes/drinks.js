const router = require('express').Router();
const drinksCtrl = require('../controllers/drinks');
const drink = require('../models/drink');

router.get('/details/:id', drinksCtrl.details)
router.get('/oops', drinksCtrl.oops)
router.post('/results', drinksCtrl.search)
router.delete('/delete/:id', drinksCtrl.delete)

module.exports = router