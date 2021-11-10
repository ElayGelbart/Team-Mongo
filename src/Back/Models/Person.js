const mongoose = require('mongoose')
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20
    },
    phoneNumber: {
      type: String,
      minlength: 7,
      maxlength: 20
    }
  }
)
module.exports = mongoose.model('Person', personSchema)