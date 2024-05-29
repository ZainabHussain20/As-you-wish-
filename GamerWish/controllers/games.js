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
  const gameId = req.params.id // Assuming "id" is in the request parameters

  try {
    // Find game by custom "id" attribute
    const game = await Game.findOne({ id: gameId })

    // Handle the case where the game is not found
    if (!game) {
      return res.status(404).send('Game not found')
    }

    res.render('store/show', {
      title: game.title, // Assuming "title" exists in your schema
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
      res.render('store/new', { message: 'Game already exists!' }) // Inform user about duplicate
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
// const axios = require('axios')
// const Game = require('../models/game')

// const index = async (req, res) => {
//   const gamesUrl = 'https://www.freetogame.com/api/games'
//   try {
//     const response = await axios.get(gamesUrl)
//     const GamestObjs = response.data

//     const gamesdata = GamestObjs.map((gamedata) => {
//       const newGame = new Game(gamedata) //create game instence from the form
//       newGame.save() // Save the new game to the database
//       return gamedata
//     })

//     res.render('store/index', {
//       Gamesdata: gamesdata,
//       title: 'Digital Games list :'
//     })
//   } catch (error) {
//     console.error('Error fetching games:', error)
//     res.status(500).send('Error fetching games')
//   }
// }

// const show = async (req, res) => {
//   console.log('show controller')
//   const gameId = req.params.id
//   const gameUrl = `https://www.freetogame.com/api/game?id=${gameId}`
//   try {
//     const response = await axios.get(gameUrl)
//     const game = response.data
//     console.log(`Game ${JSON.stringify(game)}`)
//     res.render('store/show', {
//       title: game.title,
//       game
//     })
//   } catch (error) {
//     console.error('Error fetching game details:', error)
//     res.status(500).send('Error fetching game details')
//   }
// }
// const newGame = async (req, res) => {
//   try {
//     console.log(`req.body=${JSON.stringify(req.body)}`) //to check the game added details

//     const newGame = new Game(req.body)
//     await newGame.save()
//     console.log(`game saved with ID: ${newGame._id}`) // Log for reference

//     res.render('store/new')
//   } catch (err) {
//     console.error()
//   }
// }

// const removeByName = async (req, res) => {
//   try {
//     const gameName = req.body.gameName

//     const foundGame = await Game.findOne({ title: gameName }) // Search by title (change if needed)

//     if (!foundGame) {
//       return res.status(404).json({ message: 'Game not found' })
//     }

//     const deletedGame = await Game.deleteOne({ _id: foundGame._id })
//     foundGame.deleted = true
//     if (!deletedGame.deletedCount) {
//       return res.status(404).json({ message: 'Game not found' })
//     }

//     res.json({ message: 'Game deleted successfully', id: foundGame._id }) // Return ID with success message
//   } catch (err) {
//     console.error('Error removing game:', err)
//     res.status(500).json({ message: 'Error deleting game' })
//   }
// }

// module.exports = {
//   index,
//   show,
//   new: newGame,
//   removeByName
// }


