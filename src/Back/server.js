const express = require("express");
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const MongoPassword = process.argv[2]

const MongoServerURL = `mongodb+srv://elaygelbart:${MongoPassword}@elaygelbart.qhmbq.mongodb.net/ElayGelbart?retryWrites=true&w=majority`;
mongoose.connect(MongoServerURL);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phoneNumber: String,
});
const Person = mongoose.model('Person', personSchema);

const person = new Person({
  id: 3,
  name: "shlomo",
  phoneNumber: "0507642925",
});
Person.find({ id: 5 }).then(result => {
  result.forEach(person => {
    console.log(person)
  })
});
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
});

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

morgan.token("data", (req) => {
  return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :data', {
  skip: function (req, res) { return req.method !== "POST" }
}
));

app.use("/", express.static(`${__dirname}/../Front`));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../Front/index.html`);
});

const phonebook = [ // later will be DB
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (req, res) => {
  res.send(phonebook);
});

app.get("/api/persons/:id", (req, res, next) => {
  for (let phoneObj of phonebook) {
    if (phoneObj.id == req.params.id) {
      res.send(phoneObj);
      return;
    }
  }
  next({ status: 404, msg: 'Person not found' })
});

app.delete("/api/persons/delete/:id", (req, res, next) => {
  for (let i = 0; i < phonebook.length; i++) {
    if (phonebook[i].id == req.params.id) {
      phonebook.splice(i, 1);
      res.send("selected person has been deleted")
      return
    }
  }
  next({ status: 404, msg: 'Person not found' })
});

app.post("/api/persons", (req, res, next) => {
  const userName = req.body.name;
  const userNumber = req.body.number;
  const userId = Math.floor(Math.random() * (1000000000 - 100 + 1) + 100);
  if (!userName || !userNumber) { // Check Falsy
    next({ status: 403, msg: 'must be number and name' })
    return;
  }
  for (let phoneObj of phonebook) {
    if (phoneObj.name == userName) {
      next({ status: 403, msg: 'name must be unique' });
      return;
    }
  }
  const userPhoneObj = {
    id: userId,
    name: userName,
    number: userNumber
  };
  phonebook.push(userPhoneObj);
  res.send("added to phone book");
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${phonebook.length} people
  ${new Date()}`)
});

app.use(ErrorHandler = (err, req, res, next) => {
  console.log(err); // for logs
  if (err.status) {
    res.statusMessage = err.msg
    res.status(err.status).send({
      status: err.status,
      message: err.msg,
    });
  }
  else {
    res.send(500)
  }
})

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});