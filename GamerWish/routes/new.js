const express = require('express')
const router = express.Router()
const newCtrl = require('../controllers/new')

router.get('/new', newCtrl)

module.new = router
