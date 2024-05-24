/*
i)add review 
ii)view reviews

constrain:
each user can review every game only once
*/
const Review = require('../models/review') // Assuming your review model
const Game = require('../models/game') // Assuming your game model

const mongoose = require('mongoose')
const Review = mongoose.model('Review', require('../models/review')) // Assuming review model path
const Game = mongoose.model('Game', require('../models/game')) // Assuming game model path

async function getAllReviews(req, res) {
  try {
    // Populate the 'game' field in reviews with actual game data
    const reviews = await Review.find({}).populate('game').sort('desc') // Sort by creation date descending
    res.render('reviews/index', { title: 'All Reviews', reviews })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching reviews!' })
  }
}

// Function to create a new review
async function createReview(req, res) {
  try {
    const { gameId, rating, comment } = req.body // Extract data from request body

    // Validate required fields
    if (!gameId || !rating || !comment) {
      return res.status(400).json({ message: 'Missing required review data!' })
    }

    // Find the game by ID
    const game = await Game.findById(gameId)

    if (!game) {
      return res.status(404).json({ message: 'Game not found!' })
    }

    // Create a new review object
    const newReview = new Review({ game: game._id, rating, comment })

    // Save the review
    await newReview.save()

    // Redirect to game detail page after successful creation
    res.redirect(`/games/${gameId}`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error creating review!' })
  }
}

async function getReviewById(req, res) {
  try {
    const reviewId = req.params.id

    // Populate the 'game' field in the review
    const review = await Review.findById(reviewId).populate('game')

    if (!review) {
      return res.status(404).json({ message: 'Review not found!' })
    }

    res.render('reviews/show', { title: 'Review Details', review })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching review!' })
  }
}

module.exports = {
  getAllReviews,
  createReview,
  getReviewById
}
