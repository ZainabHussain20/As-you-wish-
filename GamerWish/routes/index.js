var express = require('express')
const passport = require('passport')

var router = express.Router()
const check = 'https://api.stripe.com'
const { default: axios } = require('axios')
/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Gamer Wish' })
})

module.exports = router

// Google OAuth login route
router.get(
  '/auth/google',
  passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email']
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  )
)

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/games',
    failureRedirect: '/games'
  })
)

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/games')
  })
})
