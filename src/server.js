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
