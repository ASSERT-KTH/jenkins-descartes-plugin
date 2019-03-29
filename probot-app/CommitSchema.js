// CommitSchema.js

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommitSchema = new Schema({
  commitid: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Commit', CommitSchema)

