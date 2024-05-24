const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gameSchema = new Schema(
  {
    appId: String,
    name: String,
    image: String,
    ESRB: { type: String, enum: ['E', 'E+10', 'T', 'M', 'A', 'RP', 'RPM'] },
    supportedLangauge: String,
    publisherId: String,
    publisherName: String,
    developerId: String,
    developerName: String,
    price: { type: Number, minlength: 0, maxlength: Infinity },
    //referance for the reviews
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Game', gameSchema)
