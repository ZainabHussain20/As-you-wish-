const express = require('express');
const router = express.Router();
const gameDetailsCtrl = require('../controllers/gameDetailes');
const reviewCtrl = require('../controllers/reviews');

// GET /games
router.get('/', gameCtrl.index);

// GET /games/new
router.get('/new', gameCtrl.new);

// GET /games/:id (show functionality) MUST be below new route
router.get('/:id', gameDetailsCtrl.show);

// POST /games/:gameId/reviews
router.post('/:gameId/reviews', reviewCtrl.createReview);

module.exports = router;