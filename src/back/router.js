const express = require('express');
const mongoose = require('mongoose');
const data = require('./data');
const Person = require('./model');
const { getMatchingPerson, checkTakenName } = require('./helpers')
const router = express.Router();


router.use('/', express.static(`${__dirname}/../front`));
router.use('/', express.static(`${__dirname}/../../dist`));
router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/../front/index.html`);
})

router.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.send(result);
    })
    .catch(error => next({ status: 404, message: 'No data'}));
})

router.get('/info', (req, res, next) => {
    Person.find({}).then(result => {
        res.send(`Phonebook has info for ${result.length} people. \n ${Date()}`);
    })
    .catch(error => next({ status: 404, message: 'No data'}));
})

router.get('/api/persons/:id', (req, res, next) => {
    const personId = req.params.id;
    Person.find({ _id: personId }).then(result => {
        res.send(result[0]);
    })
    .catch(error => next({ status: 400, message: "Can't find person"}));
})

router.delete('/api/persons/:id', (req, res, next) => {
    const personId = req.params.id;
    Person.findByIdAndDelete(personId).then(result => {
        Person.find({}).then(result => {
            res.send(result);
        }).catch(error => next({ status: 404, message: 'No data'}));
    }).catch(error => next({ status: 400, message: "Can't find person"}));
})

router.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body;
    if(!name || !number){
        next({ status: 400, message: "Missing information"});
        return;
    }
    const personList = await Person.find({});
    for(let person of personList){
        if(person.name === name) return res.send(['Name taken', person._id.toString()]);
    }
    const person = new Person({
        name,
        number
    })
    person.save().then(result =>{
        console.log(`added ${name} number ${number} to phonebook`);
        Person.find({}).then(result => {
            res.send(result);
        }).catch( error => next({ status: 404, message: 'No data'}) );
    }).catch( error => next({ status: 400, message: "Can't save"}) );
})

router.put('/api/persons', (req, res, next) => {
    const { existingId, name, number } = req.body;
    existingId
    const updatedPerson = {
        name,
        number
    }
    Person.findByIdAndUpdate(existingId, updatedPerson).then(result => {
        Person.find({}).then(result => {
            res.send(result);
        }).catch(error => next({ status: 404, message: 'No data'}) );
    }).catch(error => next({ status: 400, message: "Can't find person"}) );
})

module.exports = router;
