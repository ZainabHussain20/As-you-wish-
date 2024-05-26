const axios = require('axios')
const Game = require('../models/game')

async function index(req, res) {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games')
    const games = response.data
    res.status(200).json(games)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching games' })
  }
}

async function create(req, res) {
  try {
    const newGame = req.body

    const game = new Game(newGame)
    await game.save()

    res.status(201).json({ message: 'Game created successfully', game })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Error creating game' })
  }
}

async function show(req, res) {
  try {
    const gameId = req.params.id

    const game = await Game.findById(gameId)

    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    res.status(200).json(game)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching game' }) // Assuming error response format
  }
}

module.exports = { index, create, show }
