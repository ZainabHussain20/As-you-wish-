const express = require('express')
const router = express.Router()
const wishListCtrl = require('../controllers/wishLists')
// GET /wishLists
router.get('/', wishListCtrl.index)
// GET /wishLists/new
router.get('/new', wishListCtrl.new)
// GET /wishLists/:id (show functionality) MUST be below new route
router.get('/:id', wishListCtrl.show)
// POST /wishLists
router.post('/', wishListCtrl.create)
