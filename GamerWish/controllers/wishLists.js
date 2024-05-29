const Wishlist = require('../models/wishlist')
const Game = require('../models/game')
const axios = require('axios')

const gamesUrl = 'https://www.freetogame.com/api/games'

// Function to fetch game data from the API
const fetchGameData = async (gameId) => {
  try {
    const response = await axios.get(
      `https://www.freetogame.com/api/game?id=${gameId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching game data from API:', error)
    throw new Error('Error fetching game data from API')
  }
}

// Add to wishlist function
const addToWishlist = async (req, res) => {
  const userId = req.user._id
  const gameId = req.params.gameId

  try {
    // Fetch game data from the API
    const gameData = await fetchGameData(gameId)

    // Check if the game exists in the database
    let game = await Game.findOne({ id: gameData.id })
    if (!game) {
      // If the game does not exist, save it
      game = new Game({
        id: gameData.id,
        title: gameData.title,
        thumbnail: gameData.thumbnail,
        status: gameData.status,
        short_description: gameData.short_description,
        description: gameData.description,
        game_url: gameData.game_url,
        genre: gameData.genre,
        platform: gameData.platform,
        publisher: gameData.publisher,
        developer: gameData.developer,
        release_date: gameData.release_date,
        freetogame_profile_url: gameData.freetogame_profile_url,
        minimum_system_requirements: gameData.minimum_system_requirements,
        screenshots: gameData.screenshots,
        review: []
      })
      await game.save()
    }

    // Find or create a wishlist for the user
    let wishlist = await Wishlist.findOne({ user: userId })
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, games: [] })
    }

    // Add the game to the wishlist if it's not already there
    if (!wishlist.games.includes(game._id)) {
      wishlist.games.push(game._id)
      await wishlist.save()
    }

    res.redirect('/wishLists/index')
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    res.status(500).send('Error adding to wishlist')
  }
}

// View wishlist function
const viewWishlist = async (req, res) => {
  const userId = req.user._id

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('games')
    res.render('wishlist/index', { title: 'Your Wishlist', wishlist })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    res.status(500).send('Error fetching wishlist')
  }
}

module.exports = { addToWishlist, viewWishlist }
