const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        number: {
            type: Number
        }
    }  
);

module.exports = mongoose.model("Person", personSchema);

