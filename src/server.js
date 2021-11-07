// server code
const express = require('express');
const morgan = require('morgan')
const app = express();
const data = require("./database")
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log("running...");
});
app.use(express.json()) ;
// app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"))

app.get("/api/persons",  function (req,res){
    res.send(data.data);
});

app.get("/info", function (req,res){
    res.send({Contacts: data.data.length, date:new Date()})
});

app.get("/api/persons/:id", function (req,res){
    const id = req.params.id;
    let contact;
    for (let i =0; i<data.data.length; i++){
        if(+data.data[i].id === +id){
            contact = data.data[i];
            res.send(contact);
            return
        }
    }
    res.sendStatus(404);
})

app.delete("/api/persons/", function (req,res){
    const id = req.params.id;
    for (let i =0; i<data.data.length; i++){
        if(+data.data[i].id === +id){
            data.data.splice(i,1);
            res.send("Deleted successfully!");
            return
        }
    }
    res.sendStatus(404);
})

app.post("/api/persons", function (req,res){
    const newContactName = req.body.name;
    const newContactNumber = req.body.number;
    if(!newContactName || !newContactNumber){
        res.status(403).send("The name or the number is missing");
        return;
    }
    let idNumber = 0;
    for(let i = 0; i < data.data.length; i++){
        if(data.data[i].name === newContactName){
            res.status(403).send("That name is already exists in the phonebook");
            return;
        }
        if(data.data[i].id > idNumber){
            idNumber = data.data[i].id 
        }
    }
    const newContact = {
        "id": idNumber+1,
        "name": newContactName,
        "number": newContactNumber
    }
    data.data.push(newContact);
    res.send(`${newContact.name} successfully add to your phonebook!`);
})

