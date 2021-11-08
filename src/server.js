const express = require('express');
const data = require('./data');
const morgan = require('morgan');
const cors = require('cors');
const { getMatchingPerson, checkTakenName } = require('./helpers')
const app = express();
const port = process.env.PORT || 3001;

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

app.use('/', express.static(`${__dirname}/front`));
app.use('/', express.static(`${__dirname}/../dist`));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/front/index.html`);
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
    const matchingPerson = (getMatchingPerson(personId, data));
    matchingPerson
    ? res.send(matchingPerson)
    : res.status(400).send({error: "Can't find person"});
})

app.delete('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id);
    const matchingPerson = (getMatchingPerson(personId, data));
    if(matchingPerson){
        data.splice(data.indexOf(matchingPerson),1);
        res.send(data);
    }
    else{
        res.status(400).send({error: "Can't find person"});  
    }
})

app.post('/api/persons', (req, res) => {
    const generatedId = Math.floor(Math.random()*100000);
    const { name, number } = req.body;
    if(!name || !number){
        res.status(400).send({error: "Missing information"});
        return;
    }
    if(checkTakenName(name, data)) {
        res.status(400).send({error: "Name is taken."});
        return;
    }
    const addPerson = {id: generatedId, name, number };
    data.push(addPerson);
    res.send(data);
})
