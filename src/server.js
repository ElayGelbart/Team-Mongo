const express = require('express');
const data = require('./data');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

morgan.token("data", (req) => {
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :data', {
    skip: function (req, res) { return req.method !== "POST" }
}));
  

app.get('/api/persons', (req, res) => {
    res.send(data);
})

app.get('/info', (req, res) => {
    const phonebookEntries = data.length;
    res.send(`Phonebook has info for ${phonebookEntries} people. \n ${Date()}`);
})

app.get('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id);
    const matchingPerson = (getMatchingPerson(personId));
    matchingPerson
    ? res.send(matchingPerson)
    : res.status(400).send({error: "Can't find person"});
})

app.delete('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id);
    const matchingPerson = (getMatchingPerson(personId));
    matchingPerson
    ? data.splice(data.indexOf(matchingPerson),1)
    : res.status(400).send({error: "Can't find person"})
    res.send();
})

app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random()*1000);
    const { name, number } = req.body;
    if(!name || !number){
        res.status(400).send({error: "Missing information"});
        return;
    }
    if(checkTakenName(name)) {
        res.status(400).send({error: "Name is taken."});
        return;
    }
    const newPerson = {id: newId, name, number };
    data.push(newPerson);
    res.send(data);
})

function getMatchingPerson(inputId){
    for(let person in data){
        if(data[person].id === inputId){
            return data[person];
        }
    }
    return;
}

function checkTakenName(inputName){
    for(let person in data){
        if(data[person].name === inputName) return true;
    }
    return false;
}
