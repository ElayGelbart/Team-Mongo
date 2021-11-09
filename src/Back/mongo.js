// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const MongoPassword = process.argv[2]

// const MongoServerURL = `mongodb+srv://elaygelbart:${MongoPassword}@elaygelbart.qhmbq.mongodb.net/ElayGelbart?retryWrites=true&w=majority`;
// mongoose.connect(MongoServerURL).then(result => {

//   const personSchema = new mongoose.Schema({
//     id: Number,
//     name: String,
//     phoneNumber: String,
//   });
//   const Person = mongoose.model('Person', personSchema);
//   if (process.argv.length === 3) {
//     console.log("phonebook:")
//     Person.find().then(result => {
//       result.forEach(person => {
//         console.log(person)
//       })
//       mongoose.connection.close();
//     });
//   } else {
//     const inputName = process.argv[3]
//     const inputNumber = process.argv[4]
//     const person = new Person({
//       id: 3,
//       name: inputName,
//       phoneNumber: inputNumber,
//     });

//     Person.find({ id: 5 }).then(result => {
//       result.forEach(person => {
//         console.log(person)
//       })
//     });

//     person.save().then(result => {
//       console.log('person saved!')
//       mongoose.connection.close()
//     });
//   }
// }).catch(err => {
//   console.log(err);
// });