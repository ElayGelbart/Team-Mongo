const mongoose = require('mongoose');
require('dotenv').config();

// const key = process.env.DATABASE1;
// const key1 = process.env.DATABASE2;
// const password = process.argv[2]
// const connectionString = key+password+key1;
// program(process.argv[2], process.argv[3], process.argv[4])

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});

const phoneBookSchema = new mongoose.Schema({
    id : {
      type :  Number,
      unique : true,
      required: true
    },
    name: String,
    phoneNumber: String
})

function program(password, name, phoneNum){
    if( !name && !phoneNum){
        console.log("in 1 if");
        if(password){
            console.log("in 2 if");
        Note.find({}).then(function(result){
                console.log(result)
                mongoose.connection.close()
            })
        return
        }
        mongoose.connection.close()
        return
    }
    if( !name || !phoneNum){
        mongoose.connection.close()
        return
    }
    let newId;
    let newContact;
    Note.find({}).then(function(result){
        newId = makeId(result)
        newContact = new Note({
            id : newId,
            name: name,
            phoneNumber: phoneNum,
        })  
    }).then( ()=>{
        newContact.save().then( ()=>{
        console.log("contact saved!");
        mongoose.connection.close()
        console.log(`added ${name} number ${phoneNum} to phonebook`);
        })
    })      
}

module.exports = mongoose.model('Contacts', phoneBookSchema)