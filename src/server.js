// server code
const express = require('express');
const app = express();
const data = require("./database")
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log("running...");
});

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
