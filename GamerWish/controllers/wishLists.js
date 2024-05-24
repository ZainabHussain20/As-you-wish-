/*goals:
i)view the total price and total quantity
ii)view specific game price and details
iii)remove an item from the wishList
iv)add item to the wishList
*/
const WishList = require('../models/wishList')
const CheckOut = require('../models/checkOut')
const Game = require('../models/game')
const axios = require('axios')
const create = async (req, res) => {
  try {
    const reqBody = req.body
    const userId = req.params.userId

    let games = []
    if (reqBody.games) {
      games = reqBody.games // Assign the existing array from request body
    }
    if (!games || !games.length) {
      return res.status(400).json({ message: 'No games provided in request!' })
    }

    const newWishlist = new WishList({ user: userId }) // Create a new wishlist

    // Check if user already has a wishlist
    const existingWishlist = await WishList.findOne({ user: userId })
    if (existingWishlist) {
      return res.status(409).json({ message: 'Wishlist already exists!' })
    }

    // Add games to the new wishlist
    games.forEach((gameId) => newWishlist.games.push(gameId))

    await newWishlist.save()

    return res.redirect(`/wishlist/${newWishlist._id}`) // Redirect with wishlist ID
  } catch (err) {
    console.error(err)
    // Redirect to error page or display error message
    return res.status(500).json({ message: 'wishList have not bean created!' })
  }
}

const index = async (req, res) => {
  try {
    const userId = req.params.userId
    const wishlist = await WishList.findOne({ user: userId }).populate(
      'games details'
    )
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found!' })
    }
    // Redirect to view route
    return res.redirect('wishlist/index')
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error retrieving wishlist!' })
  }
}

const add = async (req, res) => {
  try {
    const gameId = req.body.gameId
    const userId = req.params.userId
    const game = await Game.findById(gameId)
    if (!game) {
      return res.status(404).json({
        message: 'sorry gamer, this game is UnAvailable in this store!!'
      })
    }
    const wishlist = await WishList.findOneAndUpdate(
      { user: userId },
      { $push: { games: game._id } },
      { new: true }
    )
    if (!wishlist) {
      // Create a new wishlist
      const newWishlist = new WishList({ user: userId, games: [game._id] })
      await newWishlist.save()
    }
    // Redirect to new route
    return res.redirect('wishlist/new')
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error adding game to wishlist!' })
  }
}
const remove = async (req, res) => {
  try {
    const gameId = req.body.gameId
    const userId = req.params.userId

    // Find wishlist and populate games for modification
    const wishlist = await WishList.findOne({ user: userId }).populate('games')
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found!' })
    }

    const gameIndex = wishlist.games.findIndex(
      (game) => game._id.toString() === gameId //check if the game._id that is autoCreate same as the gameId (which we initilize above)
    )
    if (gameIndex === -1) {
      return res.status(404).json({ message: 'Game not found in wishlist!' })
    }

    //update the qulity and price(i mean decrement the quantity and modify the total price with the new operation)
    const game = wishlist.games[gameIndex]
    wishlist.quantity--
    wishlist.price -= game.price

    // Remove game from wishlist array
    wishlist.games.splice(gameIndex, 1)

    // Save the updated wishlist
    await wishlist.save()

    // Redirect to wishlist view with the new data
    return res.redirect(`/wishlist/${wishlist._id}`) // Redirect with wishlist ID
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error removing game from wishlist!' })
  }
}
const show = async (req, res) => {
  try {
    const userId = req.params.userId

    // populating 'games details'
    const checkout = await CheckOut.findOne({ user: userId }).populate(
      'games details'
    )

    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found!' })
    }

    if (checkout.games.length > 0) res.render('checkout', { checkout })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error retrieving checkout!' })
  }
}

module.exports = { create, index, new: add, remove, show }
