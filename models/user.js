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
  // files: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'file'
  //   }
  // ]
})

const user = mongoose.model('user', userSchema)
module.exports = user