// const express = require('express')
// const router = express.Router()
// // const ensureLoggedIn = require('../config/ensureLoggedIn')
// const gamesCtrl = require('../controllers/games')
// router.get('/', gamesCtrl.index)

// router.get('/new', gamesCtrl.new)
// router.get('/new', (req, res) => res.render('/store/new'))
// router.get('/:id', gamesCtrl.show)
// router.get('/games/:id', gamesCtrl.show);
// router.get('/games', gamesCtrl.index);
// router.post('/remove', gamesCtrl.removeByName)
// router.delete('/:gameName', gamesCtrl.removeByName)
// router.post('/new', gamesCtrl.new)
// module.exports = router

const express = require('express');
const router = express.Router();
const gamesCtrl = require('../controllers/games');

router.get('/', gamesCtrl.index);
router.get('/new', gamesCtrl.new);
router.post('/new', gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/remove', gamesCtrl.removeByName);
router.delete('/:gameName', gamesCtrl.removeByName);

module.exports = router;
