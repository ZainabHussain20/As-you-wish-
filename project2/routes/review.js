const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')
// GET /reviews
router.get('/', reviewCtrl.index)
// GET /reviews/new
router.get('/new', reviewCtrl.new)
// GET /reviews/:id (show functionality) MUST be below new route
router.get('/:id', reviewCtrl.show)
// POST /reviews
router.post('/', reviewCtrl.create)
