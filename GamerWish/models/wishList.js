const mongoose = require('mongoose')
const Schema = mongoose.Schema
const wishListSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  quntity: Number
})
