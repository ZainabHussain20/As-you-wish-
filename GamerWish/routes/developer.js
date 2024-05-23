const express = require('express')
const router = express.Router()
const developerCtrl = require('../controllers/developer')
// GET /developers
router.get('/', developerCtrl.index)
// GET /developers/new
router.get('/new', developerCtrl.new)
// GET /developers/:id (show functionality) MUST be below new route
router.get('/:id', developerCtrl.show)
// POST /developers
router.post('/', developerCtrl.create)
