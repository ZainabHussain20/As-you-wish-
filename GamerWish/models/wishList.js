const mongoose = require('mongoose')
const Schema = mongoose.Schema
const wishListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // reference to user
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  details: [{ type: Schema.Types.ObjectId, ref: 'CheckOut' }], // Assuming details are stored in CheckOut model
  quantity: { type: Number, default: 0 },
  price: { type: Number, minLength: 0, maxLength: Infinity }
})

module.exports = mongoose.model('WishList', wishListSchema)
