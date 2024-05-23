var express = require('express')
var router = express.Router()
const check = 'https://api.stripe.com'
const { default: axios } = require('axios')
/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
