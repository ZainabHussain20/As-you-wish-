const axios = require('axios')
const Game = require('../models/game')

const index = async (req, res) => {
  const gamesUrl = 'https://www.freetogame.com/api/games'
  try {
    const response = await axios.get(gamesUrl)
    const GamestObjs = response.data

    const gamesdata = GamestObjs.map((gamedata) => {
      const newGame = new Game(gamedata) //create game instence from the form
      newGame.save() // Save the new game to the database
      return gamedata
    })

    res.render('store/index', {
      Gamesdata: gamesdata,
      title: 'Digital Games list :'
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).send('Error fetching games')
  }
}

const show = async (req, res) => {
  const gameId = req.params.id
  const gameUrl = `https://www.freetogame.com/api/game?id=${gameId}`
  try {
    const response = await axios.get(gameUrl)
    const game = response.data
    res.render('store/show', {
      title: game.title,
      game
    })
  } catch (error) {
    console.error('Error fetching game details:', error)
    res.status(500).send('Error fetching game details')
  }
}
const newGame = async (req, res) => {
  try {
    console.log(`req.body=${JSON.stringify(req.body)}`) //to check the game added details

    const newGame = new Game(req.body)
    await newGame.save()
    console.log(`game saved with ID: ${newGame._id}`) // Log for reference

    res.render('store/new')
  } catch (err) {
    console.error()
  }
}

const removeByName = async (req, res) => {
  try {
    const gameName = req.body.gameName

    const foundGame = await Game.findOne({ title: gameName }) // Search by title (change if needed)

    if (!foundGame) {
      return res.status(404).json({ message: 'Game not found' })
    }

    const deletedGame = await Game.deleteOne({ _id: foundGame._id })
    foundGame.deleted = true
    if (!deletedGame.deletedCount) {
      return res.status(404).json({ message: 'Game not found' })
    }

    res.json({ message: 'Game deleted successfully', id: foundGame._id }) // Return ID with success message
  } catch (err) {
    console.error('Error removing game:', err)
    res.status(500).json({ message: 'Error deleting game' })
  }
}

module.exports = {
  index,
  show,
  new: newGame,
  removeByName
}
