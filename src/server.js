const express = require("express");
const cors = require("cors");
const app = express();
const { data } = require("../data")
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true} ))
app.use('/', express.static(path.resolve("./front")));               // serve main path as static dir


app.get('/', async (req, res) => {     
    res.sendFile(path.resolve("../front/index.html"))
});

app.get("/api/persons", (req, res) => {
    res.send(data)
});

app.get("/info", (req, res) => {
    res.send(`<h1>PhoneBook has info for ${data.length} Pepole</h1>
                <p>LastSync: ${new Date().toLocaleString()} </p>`)
});

app.get('/api/persons/:id', (req, res) => {
    const personObj = data.find(person => person.id === Number(req.params.id));
    personObj ? res.send(personObj) : res.status(204).send(`<p> Cant Find a person with that Id`);
});



app.listen(process.env.PORT || 3001);