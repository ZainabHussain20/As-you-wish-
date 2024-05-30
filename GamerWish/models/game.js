const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gameSchema = new Schema(
  {
    id: String,
    title: String,
    thumbnail: String,
    status: String,
    short_description: String,
    description: String,
    game_url: String,
    genre: String,
    platform: String,
    publisher: String,
    developer: String,
    release_date: String,
    freetogame_profile_url: String,
    minimum_system_requirements: {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String
    },
    screenshots: [{ id: String, image: String }],

    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    deleted: {
      type: Boolean,
      default: false // Mark games as not deleted by default
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Game', gameSchema)
