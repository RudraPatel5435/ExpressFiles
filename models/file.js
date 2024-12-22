const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false
  },
  filename: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('file', fileSchema)