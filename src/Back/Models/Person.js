const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20
  },
  phoneNumber: String,
  minLength: 10,
  maxLength: 40
});
module.exports = mongoose.model('Person', personSchema);