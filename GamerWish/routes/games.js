const express = require('express')
const gamesController = require('../controllers/games') // Assuming the correct relative path

const router = express.Router()

router.get('/', gamesController.index) // Fetch all games
router.post('/', gamesController.create) // Create a new game
router.get('/:id', gamesController.show) // Show a game by ID

module.exports = router
