/*goals:
i)view the total price and total quantity
ii)view specific game price and details
iii)remove an item from the wishList
iv)add item to the wishList
*/
const WishList = require('../models/wishList')
const CheckOut = require('../models/checkOut')
const Game = require('../models/game')
const create = async (req, res) => {
  try {
    const reqBody = req.body
    const userId = req.params.userId

    let games = []
    if (reqBody.games) {
      games = reqBody.games
    }

    const newWishlist = new WishList({ user: userId }) // Create a new wishlist

    // Check if user already has a wishlist
    const existingWishlist = await WishList.findOne({ user: userId })

    // Add games to the new wishlist
    games.forEach((game) => newWishlist.games.push(game))

    await newWishlist.save()

    return res.redirect(`/wishlist/${newWishlist._id}`) // Redirect with wishlist ID
  } catch (err) {
    console.error(err)
  }
}

const index = async (req, res) => {
  try {
    const userId = req.params.userId
    const wishlist = await WishList.findOne({ user: userId }).populate(
      'games details'
    )
    if (!wishlist) {
      console.error(wishlist)
    }
    // Redirect to view route
    return res.redirect('wishlist/index')
  } catch (err) {
    console.error(err)
  }
}

const add = async (req, res) => {
  try {
    const gameId = req.body.gameId //request the gameId from the body
    const userId = req.params.userId //request the user ID from the parameters at the URL
    const game = await Game.findById(gameId)
    if (!game) {
      console.error(game)
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
  }
}
const remove = async (req, res) => {
  try {
    const gameId = req.body.gameId
    const userId = req.params.userId

    // Find wishlist and populate games for specific userID
    const wishlist = await WishList.findOne({ user: userId }).populate('games')
    if (!wishlist) {
      console.error(wishlist)
    }

    const gameIndex = wishlist.games.findIndex(
      (game) => game._id.toString() === gameId //check if the game._id  same as the gameId (which we initilize above)
    )
    if (gameIndex === -1) {
      //if the index is not exist then the game is not added to the wishList for the user.
      return console.error()
    }

    //update the quantity and price(i mean decrement the quantity and modify the total price with the new operation)
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
      console.error(checkout)
    }

    if (checkout.games.length > 0) res.render('checkout', { checkout })
  } catch (err) {
    console.error(err)
  }
}

module.exports = { create, index, new: add, remove, show }
