const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = new Schema(
  {
    reviewId: Number,
    gameID: { type: Schema.Types.ObjectId, ref: 'Game' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Review', reviewSchema)
