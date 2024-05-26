var express = require('express')
const passport = require('passport');

var router = express.Router()
const check = 'https://api.stripe.com'
const { default: axios } = require('axios')
/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Gamer Wish' })
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/index',
    failureRedirect: '/index'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/index');
  });
});

module.exports = router
