const { ESRCH } = require("constants");
const express = require("express");
const port = 8080;
const app = express();
const phonebook = [
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

app.get("/api/persons/:id", (req, res) => {
  for (let phoneObj of phonebook) {
    if (phoneObj.id == req.params.id) {
      res.send(phoneObj);
      return
    }
  }
  res.send(404);
})

app.get("/info", (req, res) => {
  let counter = 0;
  for (let obj of phonebook) {
    counter++;
  }
  res.send(`Phonebook has info for ${counter} people
  ${new Date()}`)
});

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});