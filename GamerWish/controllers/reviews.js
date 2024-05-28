const Game = require('../models/game')

module.exports = {
  create,
  delete: deleteReview
}

async function deleteReview(req, res) {
  const game = await Game.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  })
  if (!game) {
    console.log('review cannot be created')
    return res.redirect('/games')
  }
  game.reviews.remove(req.params.id)
  console.log('review removed')
  // Save the updated game doc
  await game.save()
  res.redirect(`/games/${game._id}`)
}

async function create(req, res) {
  console.log('review created')
  const game = await Game.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar

  game.reviews.push(req.body)
  try {
    // Save any changes made to the game doc
    await game.save()
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/games/${game._id}`)
}