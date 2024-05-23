const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    userId: String,
    userName: String,
    userPassword: String,
    userType: { type: String, enum: ['gamer', 'admin'] }
  },
  { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)
