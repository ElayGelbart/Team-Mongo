const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String
  }
);
module.exports = mongoose.model('Person', personSchema);