const mongoose = require('mongoose')
const Schema = mongoose.Schema
const wishListSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  quntity: Number,
  details: { type: Schema.Types.ObjectId, ref: 'CheckOut' }
})
module.export = mongoose.module('WishList', wishListSchema)
