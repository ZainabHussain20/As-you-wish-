const mongoose = require('mongoose')
const Schema = mongoose.Schema
const developerSchema = new Schema(
  {
    name: String,
    description: String
  },
  { timestamps: true }
)
module.export = mongoose.module('Developer', developerSchema)
