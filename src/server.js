const express = require('express');
const app = express();
const port = 3001;
const data = require('./data');


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})


app.get('/api/persons', (req, res) => {
    res.send(data);
})

app.get('/info', (req, res) => {
    const phonebookEntries = Object.keys(data).length;
    res.send(`Phonebook has info for ${phonebookEntries} people. \n ${Date()}`);
})

app.get('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id);
    for(let person in data){
        if(data[person].id === personId){
            res.send(data[person]);
        }
    }
    res.status(204).send({error: "Can't find person"});
})
