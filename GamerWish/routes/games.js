const express = require('express')
const router = express.Router()
// const ensureLoggedIn = require('../config/ensureLoggedIn')
const gamesCtrl = require("../controllers/games")

router.get("/", gamesCtrl.index)
router.get("/:id", gamesCtrl.show)


module.exports = router
