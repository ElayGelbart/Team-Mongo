const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
const { data } = require("../data")
const path = require("path");
const Person = require("../models/person")

const { errorHandler } = require("./handlers/errorHandler")

/*mongoose config */
const dbURI = "mongodb+srv://teon77:77276579@cluster0.12rzz.mongodb.net/personsTask?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
.then((result) => app.listen(process.env.PORT || 3001, () => {
    console.log(`Express is working`);
  }))
.catch((err) => console.log(err))



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true} ))

app.use('/', express.static(path.resolve("./front")));               // serve main path as static dir


morgan.token('body', (req, res) => JSON.stringify(req.body));                               
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.get('/', async (req, res) => {     
    res.sendFile(path.resolve("../front/index.html"))                 // main html page
});

app.get("/api/persons", (req, res) => {
    Person.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
   
});

app.get("/info", (req, res) => {
    res.send(`<h1>PhoneBook has info for ${data.length} Pepole</h1>
                <p>Last Sync: ${new Date().toLocaleString()} </p>`)
});

app.get('/api/persons/:id', (req, res, next) => {
    const personObj = data.find(person => person.id === Number(req.params.id));                                     // Array.find() - find one person Object with requested id or return undefined
    personObj ? res.send(personObj) : next(400);   
});

app.delete('/api/persons/:id', (req, res, next) => {
    
    const personId = req.params.id;
    Person.findOneAndDelete({id: personId}, (err, docs) => {
        if(err) {
            console.log(err);
            next(400);
        }
        else {
           res.send();
        }
    })
})

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body;
    if(!name || !number){
        next(422)
    }

    Person.find({name: name} , (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            next(406)
        }
    })
        const person = new Person({
        id:  Math.floor(Math.random() * 10000),
        name,
        number
    })

    person.save()
    .then((result) => {
        if(result)
        res.send("Saved Successfully");
    })
    .catch((err) => {
        console.log(err);
    })
})

app.use(errorHandler);

// const server = app.listen(process.env.PORT || 3001, () => {
//     const port = server.address().port;
//     console.log(`Express is working on port ${port}`);
//   });