/*
i)add new game
ii)view game
iii)remove game
iv)update game data
*/
const Game = require('../models/game')
const axios = require('axios')
// Function to fetch games data from Twitch API
exports.getGames = async (req, res) => {
  try {
    // Fetch games data from Twitch API
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields id, name, genres.name, release_dates.human; limit 10;`,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`, // Make sure to define accessToken
          Accept: 'application/json'
        }
      }
    )

    // Extract games from the response
    const games = response.data

    // Render the 'games' view and pass the fetched games data
    res.render('games', { games })
  } catch (error) {
    console.error('Error fetching games from Twitch API:', error.message)
    // Handle errors, e.g., render an error page
    res.status(500).render('error', { error: error.message })
  }
}
const create = async (req, res) => {
  try {
    const reqBody = req.body

    const apid = reqBody.appId
    const reqName = reqBody.name
    const reqLan = reqBody.supportedLangauge
    const reqPubId = reqBody.publisherId
    const reqPubName = reqBody.publisherName
    const devId = reqBody.developerId
    const devName = reqBody.developerName
    let reqPrice = reqBody.price
    if (apid) {
      apid.trim()
    }
    //trim the name of the game from both edges(end and start)
    if (reqName) {
      reqName.trim()
      reqName.toLowerCase()
    }
    if (reqBody.image) {
      reqBody.image.trim()
    }
    if (reqLan) reqLan.trim()
    if (reqPubId) reqPubId.trim()
    if (reqPubName) reqPubName.trim()
    if (devId) devId.trim()
    if (devName) devName.trim()
    if (reqPrice) {
      const price = parseFloat(reqPrice)
      if (price < 0) price *= -1
      reqPrice = price.toString()
    }
    const game = new Game(reqBody)
    await game.save()
    res.redirect('/games/new')
  } catch (err) {
    console.error(err)

    res.redirect('/games/new')
  }
}
async function show(req, res) {
  const game = await Game.findById(req.params.id)
  console.log('log:' + res.render('games/show', { title: 'store games', game }))
}
const addGameToTheStore = async (req, res) => {
  try {
    const reqBody = req.body

    const game = new Game(reqBody) //create the game
    await game.save() //import the game details into the database
    res.redirect(`/games/${game._id}`)
  } catch (err) {
    console.error(err)
  }
}
const index = async (req, res) => {
  const games = await Game.find({})
  console.log(games)
  res.render('store/games', { games, title: 'games:' })
}
const remove = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id)
    if (!game) {
      console.error()
    }
    console.log('Game deleted:', game)
    return res.redirect('/games')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { create, new: addGameToTheStore, index, show, remove }
