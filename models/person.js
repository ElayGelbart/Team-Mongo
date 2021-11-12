const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
}, {timestamps: true});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;