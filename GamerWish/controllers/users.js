/*
we notice that the users are 2 types so we will divide the functions to be used for both of them(each have his distinct functions)
i)admin:
1)add new game
2)remove game
3)update game
ii)gamer:
1)buy game(add to the wishList)
2)remove the game(remove from wishList)
3)view the cart(view the wishList)
4)add a review for a game
*/
const User = require('../models/user')
const Game = require('../models/game')
const Review = require('../models/review')
const Wishlist = require('../models/wishlist')