const axios = require('axios')
const Game = require('../models/game')
// Function to fetch games data from Twitch API


const index = async (req, res) => {
  const gamesUrl = "https://www.freetogame.com/api/games"
  try {
    const response = await axios.get(gamesUrl)
    const GamestObjs = response.data
    const Gamesdata = GamestObjs.map((Gamesdata) => {

      const newGame= new Game(Gamesdata)
      newGame.save()
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


module.exports = { 
  index,
  show
 }