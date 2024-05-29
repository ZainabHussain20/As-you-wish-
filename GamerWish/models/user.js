const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    userId: String,
    userName: String,
    email: String,
    googleId: {
      type: String,
      required: true
    },
    userPassword: String,
    userType: { type: String, enum: ['gamer', 'admin'] },
    active: Boolean
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
