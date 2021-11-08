const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

// for DEV
// const MongoServerURL = `mongodb+srv://elaygelbart:${MongoPassword}@elaygelbart.qhmbq.mongodb.net/ElayGelbart?retryWrites=true&w=majority`;
const MongoServerURL = process.env.MONGO_URL;
mongoose.connect(MongoServerURL);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});
const Person = mongoose.model('Person', personSchema);

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

app.get("/api/persons", async (req, res) => {
  const phonebook = await Person.find({});
  res.send(phonebook);
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const selectedPerson = await Person.find({ _id: req.params.id });
    res.send(selectedPerson[0]);
  } catch (err) {
    next({ status: 404, msg: 'Person not found' });
  }
});

app.delete("/api/persons/delete/:id", async (req, res, next) => {
  const phonebook = await Person.find({});
  try {
    const response = await Person.findByIdAndRemove(req.params.id)
    res.send("selected person has been deleted")
  } catch (err) {
    next({ status: 404, msg: 'Person not found' })
  }
});

app.post("/api/persons", async (req, res, next) => {
  const userName = req.body.name;
  const userNumber = req.body.number;
  if (!userName || !userNumber) { // Check Falsy
    next({ status: 403, msg: 'must be number and name' })
    return;
  }
  const phonebook = await Person.find({});
  for (let phoneObj of phonebook) {
    if (phoneObj.name == userName) {
      next({ status: 403, msg: 'name must be unique' });
      return;
    }
  }
  const userPhoneObj = {
    name: userName,
    phoneNumber: userNumber
  };
  const person = new Person(userPhoneObj);
  await person.save();
  console.log("person saved");
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