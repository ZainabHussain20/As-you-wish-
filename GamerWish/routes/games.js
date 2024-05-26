const express = require('express')
const router = express.Router()
const gameCtrl = require('../controllers/games')
const reviewCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn')
const { model } = require('mongoose')

// GET /games
router.get('/', gameCtrl.index)

// GET /games/new
router.get('/new', gameCtrl.new)

// GET /games/:id (show functionality) MUST be below new route
router.get('/:id', gameCtrl.show)

// POST /games
router.post('/', gameCtrl.create)

// POST /games/:gameId/reviews
module.exports = router
