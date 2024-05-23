/*
i)add new game
ii)view game
iii)remove game
iv)update game data
*/
const mongoose = require('mongoose')
const Game = require('../models/game')
const Review = require('../models/review')
const axios = require('axios')
const steamUrl =
  'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json'

const create = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.name.trim()
    }

    const game = new Game(req.body)
    await game.save()
    res.redirect('/games/new')
  } catch (err) {
    console.error(err)

    res.redirect('/games/new')
  }
}
//add new game to the database
const add = (req, res) => {}
//show all the games
const index = (req, res) => {}
//show specific game
const show = (req, res) => {}
const remove = (req, res) => {}
module.exports = { create, add, index, show, remove }
