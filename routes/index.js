const router = require('express').Router();
const passport = require('passport')
const drinksCtrl = require('../controllers/drinks')

/* GET home page. */
router.get('/', drinksCtrl.home)

// // Google OAuth login route
// router.get('/auth/google', passport.authenticate(
//   'google',
//   { scope: ['profile', 'email'] }
// ));

// // Google OAuth callback route
// router.get('/oauth2callback', passport.authenticate(
//   'google',
//   {
//     successRedirect: '/',
//     failureRedirect: '/'
//   }
// ));

// // OAuth logout route
// router.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
