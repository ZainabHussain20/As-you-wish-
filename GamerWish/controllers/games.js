const axios = require('axios')
const Game = require('../models/game')
// Function to fetch games data from Twitch API


const index = async (req, res) => {
  const gamesUrl = "https://www.freetogame.com/api/games"
  try {
    const response = await axios.get(gamesUrl)
    const GamestObjs = response.data
    const Gamesdata = GamestObjs.map((Gamesdata) => {
      return Gamesdata
    })
    res.render("store/index", {
      Gamesdata,
      title: "Digital Games list :",
    })
  } catch (error) {
    console.error("Error fetching games:", error)
    res.status(500).send("Error fetching games")
  }
}

const show = async (req, res) => {
  const gameId = req.params.id;
  const gameUrl = `https://www.freetogame.com/api/game?id=${gameId}`;
  try {
    const response = await axios.get(gameUrl);
    const game = response.data;
    res.render('store/show', {
      title: game.title,
      game
    });
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).send("Error fetching game details");
  }
};
// const create = async (req, res) => {
//   try {
//     const reqBody = req.body

//     const apid = reqBody.appId
//     const reqName = reqBody.name
//     const reqLan = reqBody.supportedLangauge
//     const reqPubId = reqBody.publisherId
//     const reqPubName = reqBody.publisherName
//     const devId = reqBody.developerId
//     const devName = reqBody.developerName
//     let reqPrice = reqBody.price
//     if (apid) {
//       apid.trim()
//     }
//     //trim the name of the game from both edges(end and start)
//     if (reqName) {
//       reqName.trim()
//       reqName.toLowerCase()
//     }
//     if (reqBody.image) {
//       reqBody.image.trim()
//     }
//     if (reqLan) reqLan.trim()
//     if (reqPubId) reqPubId.trim()
//     if (reqPubName) reqPubName.trim()
//     if (devId) devId.trim()
//     if (devName) devName.trim()
//     if (reqPrice) {
//       const price = parseFloat(reqPrice)
//       if (price < 0) price *= -1
//       reqPrice = price.toString()
//     }
//     const game = new Game(reqBody)
//     await game.save()

//     res.status(201).json({ message: 'Game created successfully', game })
//   } catch (error) {
//     console.error(error)
//     res.status(400).json({ message: 'Error creating game' })
//   }
// }

// async function show(req, res) {
//   const game = await Game.findById(req.params.id)
//   console.log('log:' + res.render('store/show', { title: 'store games', game }))
// }

// const index = async (req, res) => {
//   const games = await Game.find({})
//   console.log(games)
//   res.render('store/games', { games, title: 'games:' })
// }

// const remove = async (req, res) => {
//   try {
//     const game = await Game.findByIdAndDelete(req.params.id)
//     if (!game) {
//       console.error()
//     }
//     console.log('Game deleted:', game)
//     return res.redirect('/games')
//   } catch (err) {
//     console.error(err)
//   }
// }

module.exports = { 
  index,
  show
 }