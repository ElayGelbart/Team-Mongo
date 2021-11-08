const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const { data } = require("../data")
const path = require("path");

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
    res.send(data)
});

app.get("/info", (req, res) => {
    res.send(`<h1>PhoneBook has info for ${data.length} Pepole</h1>
                <p>Last Sync: ${new Date().toLocaleString()} </p>`)
});

app.get('/api/persons/:id', (req, res) => {
    const personObj = data.find(person => person.id === Number(req.params.id));                                     // Array.find() - find one person Object with requested id or return undefined
    personObj ? res.send(personObj) : res.status(400).json({ error: 'We didnt find a person with that ID' });       // 204 status didnt transfer the error object - not sure why
});

app.delete('/api/persons/:id', (req, res) => {
    const personObj = data.find(person => person.id === Number(req.params.id));
    if(!personObj) {
        data.splice(data.indexOf(personObj), 1)
        res.send("Deleted Successfully");
        }
        else {
            res.status(400).json({ error: 'We didnt find a person with that ID' });
        }
})


app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    if(!name || !number){
        res.status(400).json({                         
            error: 'You must provide a Name and Number' 
          });
    }

    const personByName = data.find(person => person.name === name);
    if (!personByName) {
        const newPersonObject = { "id": Math.floor(Math.random() * 10000), name, number };          // generates id, could have done it differently
        data.push(newPersonObject);
        res.send("Saved Successfully");
        return;
        }
        else {
            res.status(400).json({ error: 'This Name is Taken' });
        }
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Express is working on port 3001`);
  });