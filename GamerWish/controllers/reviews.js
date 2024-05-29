const Game = require('../models/game')
const Review = require('../models/review');
const mongoose = require('mongoose');


module.exports = {
  create,
  delete: deleteReview
}


async function create(req, res) {
  console.log('review created');
  // const gameId =new mongoose.Types.ObjectId(req.params.id)
  const game = await Game.findOne({ id: req.params.id }).exec();

  // Create a new review
  const review = new Review({
    content: req.body.content,
    rating: req.body.rating,
    user: req.user._id,
    userName: req.user.name,
    userAvatar: req.user.avatar
  });

  try {
    // Save the review
    await review.save();
    
    // Add review to the game
    game.reviews.push(review._id);
    
    // Save the game with the new review
    await game.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/games/${game.id}`);
}

async function deleteReview(req, res) {
  const game = await Game.findOne({
    'reviews': req.params.id
  }).populate('reviews');
  
  if (!game) {
    console.log('Review not found');
    return res.redirect('/games');
  }
  
  const review = await Review.findById(req.params.id);
  
  if (review.user.toString() !== req.user._id.toString()) {
    console.log('Unauthorized attempt to delete review');
    return res.redirect(`/games/${game._id}`);
  }

  try {
    // Remove review from game
    game.reviews.pull(review._id);
    await game.save();
    
    // Remove review from the database
    await review.remove();
    
    console.log('review removed');
  } catch (err) {
    console.log(err);
  }
  
  res.redirect(`/games/${game._id}`);
}