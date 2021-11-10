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

const Person = mongoose.model("Person", personSchema);

const url = `mongodb+srv://ehood-goren:${process.argv[2]}@cluster0.22kka.mongodb.net/personDatabase?retryWrites=true&w=majority`

function checkArgs(){
    mongoose.connect(url);
    switch (process.argv.length) {
        case 5:
            createPerson(process.argv[3], process.argv[4]);
            break;
        case 3:
            getPersons();
            break;
        default:
            mongoose.connection.close();
            return;
    }
}

function createPerson(name, number){
    const person = new Person({
        name,
        number
    })
    person.save().then(result =>{
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })    
}

function getPersons(){
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();
    })
}

checkArgs();
