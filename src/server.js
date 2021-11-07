const express = require("express");
const cors = require("cors");
const app = express();
const { data } = require("../data")
const path = require("path");
const shortId = require("shortid"); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true} ))
app.use('/', express.static(path.resolve("./front")));               // serve main path as static dir


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
    const personObj = data.find(person => person.id === Number(req.params.id));         // Array.find() - find one person Object with requested id or return undefined
    personObj ? res.send(personObj) : res.status(400).json({                            // 204 status didnt transfer the error object - not sure why
        error: 'We didnt find a person with that ID' 
      });
});

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if(!name || !number){
        res.status(400).json({                         
            error: 'You must provide a Name and Number' 
          });
    }

    const personByName = data.find(person => person.name === name);
    if (!personByName) {
    const newPersonObject = { 
        "id": shortId.generate(), name, number                          // generates short id, could have done it differently
        }
        data.push(newPersonObject);
        res.send("Saved");
        } else {
            res.status(400).json({ error: 'This Name is Taken' });
    }
})



app.listen(process.env.PORT || 3001);