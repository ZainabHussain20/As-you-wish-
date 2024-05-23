const mongoose = require('mongoose')
const Schema = mongoose.Schema
const checkOUtSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  quntity: { type: Number, default: 0 }
})
module.exports = mongoose.model('checkOut', checkOUtSchema)
