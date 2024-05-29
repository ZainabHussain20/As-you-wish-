const axios = require('axios')
const Game = require('../models/game')
const mongoose = require('mongoose')

const index = async (req, res) => {
  try {
    const games = await Game.find({})

    res.render('store/index', {
      Gamesdata: games,
      title: 'Digital Games list :'
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).send('Error fetching games')
  }
}

const show = async (req, res) => {
  const gameId = req.params.id

  try {
    const game = await Game.findOne({ id: gameId }).populate('reviews')
    console.log('Populated reviews:', game.reviews)

    if (!game) {
      return res.status(404).send('Game not found')
    }

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
    console.log(`req.body=${JSON.stringify(req.body)}`) // to check the game added details
    const newGameData = req.body
    const existingGame = await Game.findOne({ title: newGameData.title }) // Check for duplicate by title
    if (!existingGame) {
      const game = new Game(newGameData)
      await game.save()
      console.log(`game saved with ID: ${game._id}`) // Log for reference
      res.render('store/new', { message: 'Game added successfully!' })
    } else {
      res.render('store/new', { message: 'Game already exists!' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error adding game' })
  }
}

const removeByName = async (req, res) => {
  try {
    const gameName = req.body.gameName
    const foundGame = await Game.findOne({ title: gameName })
    if (!foundGame) {
      return res.status(404).json({ message: 'Game not found' })
    }
    const deletedGame = await Game.deleteOne({ _id: foundGame._id })
    foundGame.deleted = true
    if (!deletedGame.deletedCount) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ message: 'Game deleted successfully', id: foundGame._id })
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
