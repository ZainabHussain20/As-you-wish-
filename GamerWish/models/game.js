const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gameSchema = new Schema(
  {
    appId: Number,
    name: String,
    image: String,
    pg: String,
    supportedLangauge: String,
    publisherId: String,
    publisherName: String,
    developerId: String,
    developerName: String,
    price: Number,
    //referance for the reviews
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Game', gameSchema)
