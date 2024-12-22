const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/expressFiles')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  files: {
    type: Array,
    required: false
  }
})

const user = mongoose.model('user', userSchema)
module.exports = user