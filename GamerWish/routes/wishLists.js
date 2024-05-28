const express = require('express');
const router = express.Router();
const wishlistCtrl = require('../controllers/wishLists');
const ensureLoggedIn = require('../config/ensureLoggedIn'); // to ensure user is logged in

router.post('/add/:gameId', ensureLoggedIn, wishlistCtrl.addToWishlist);
router.get('/index', ensureLoggedIn, wishlistCtrl.viewWishlist); // Adjusted path for viewing wishlist

module.exports = router;
