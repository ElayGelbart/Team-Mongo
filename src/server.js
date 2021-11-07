// server code
const express = require('express');
const app = express();
const data = require("./database")
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log("running...");
})

app.get("/api/persons",  function (req,res){
    res.send(data);
})

