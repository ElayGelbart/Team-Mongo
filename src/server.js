const express = require('express');
const path = require('path')
const Note = require('../models/note');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const connectionString = process.env.DATABASE;

app.listen(port, ()=>{
    console.log("running...");
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")))

app.get("/" , (req,res)=>{
    res.sendFile("../frontend/index.html")
});


app.get("/api/persons", async function (req,res){
    const data = await Note.find({});
    res.send(data);
});

app.get("/info", async function (req,res){
    const data = await Note.find({});
    res.send({Contacts: data.length, date:new Date()});
});

app.get("/api/persons/:id", async function (req,res){
    const id = req.params.id;
    try {
        const contact = await Note.find({id: id});
        if(contact[0]){
            res.send(contact[0]);
        }else{
            throw "Wrong Id";
        }
    } catch (error) {
        res.status(400).send("Cant find person");
    }   
})

app.delete("/api/persons/:id", async function (req,res){
    const id = req.params.id;
    try {
        const response = await Note.deleteOne({ id : id })    
        if(response.deletedCount === 1){
            res.send("Deleted successfully!");
            return;
        }else{
            throw "error";
        }
       
    } catch (err) {
        res.status(400).send("Cant find person");  
    }       
 })

app.post("/api/persons", async function (req,res){
    if (req.body === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    const newContactName = req.body.name;
    const newContactNumber = req.body.number;
    if(!newContactName || !newContactNumber){
        res.status(400).send("The name or the number is missing");
        return;
    } 
    try {
    const data = await Note.find({});
    const newId = makeId(data);
    for(let i = 0; i < data.length; i++ ){
        if(data[i].phoneNumber === newContactNumber){
        res.status(403).send("This number is already exists in your phonebook");
        return;
        }
    }           
    const newContact = new Note({
        "id": newId,
        "name": newContactName,
        "phoneNumber": newContactNumber
    })
    newContact.save().then((savedContact)=>{
        res.send(`${savedContact.name} successfully add to your phonebook!`);
    })
    } catch (error) {
        res.send(error);
    }
})

function makeId(phonebook){
    let k = 0;
    for (let contact of phonebook){
        if(contact.id > k){
            k = contact.id;
        }
    }
    return (+k +1)
}