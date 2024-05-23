const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gameSchema = new Schema(
  {
    appId: Number,
    name: String,
    image: String,
    pg: String,
    supportedLangauge: String
  },
  { timestamps: true }
)
module.export = mongoose.module('Game', gameSchema)
