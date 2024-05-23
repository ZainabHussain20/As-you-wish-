const express = require('express')
const router = express.Router()
const companyCtrl = require('../controllers/companies')
// GET /companies
router.get('/', companyCtrl.index)
// GET /companies/new
router.get('/new', companyCtrl.new)
// GET /companies/:id (show functionality) MUST be below new route
router.get('/:id', companyCtrl.show)
// POST /companies
router.post('/', companyCtrl.create)
