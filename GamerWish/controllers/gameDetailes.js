/*
i)add new game
ii)view game
iii)remove game
iv)update game data
*/
const Game = require('../models/game')


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
      const price = reqPrice.parseInt()
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

const index = async (req, res) => {
  const games = await Game.find({})
  console.log(games)
  res.render('store/games', { games, title: 'games:' })
}

const remove = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id)
    if (!game) {
      return res.status(404).json({ message: 'Game isnt availabe!' })
    }
    console.log('Game deleted:', game)
    return res.redirect('/games')
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ message: 'some issues with deleting the game' })
  }
}
const addGameToTheStore = async (req, res) => {
  try {
    const reqBody = req.body

    const game = new Game(reqBody)
    await game.save()
    res.redirect(`/games/${game._id}`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'cant add the game!' })
  }
}

module.exports = { create, new: addGameToTheStore, index, show, remove }
