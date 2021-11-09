const mongoose = require('mongoose');
require('dotenv').config();


const phonBookSchema = new mongoose.Schema({
    id : Number,
    name: String,
    phoneNumber: Number
})

const Note = mongoose.model('Contacts', phonBookSchema)

const key = process.env.DATABASE;
const key1 = process.env.DATABASE2;
const password = process.argv[2]

const connectionString = key+password+key1;

mongoose.connect(connectionString)
.then(console.log("DB connected"));


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

function makeId(phonebook){
    let k = 0;
    for (let contact of phonebook){
        if(contact.id > k){
            k = contact.id;
        }
    }
    return (+k +1)
}

program(process.argv[2], process.argv[3], process.argv[4])

