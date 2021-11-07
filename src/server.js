const express = require('express');
const app = express();
const port = 3001;
const data = require('./data');

app.use(express.json());
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})


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
    : res.status(204).send({error: "Can't find person"});
})

app.delete('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id);
    const matchingPerson = (getMatchingPerson(personId));
    matchingPerson
    ? data.splice(data.indexOf(matchingPerson),1)
    : res.status(204).send({error: "Can't find person"})
    res.send();
})

app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random()*1000);
    const { name, number } = req.body
    const newPerson = {id: newId, name, number };
    data.push(newPerson);
    res.send();
})

function getMatchingPerson(inputId){
    for(let person in data){
        if(data[person].id === inputId){
            return data[person];
        }
    }
    return;
}
