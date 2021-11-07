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
})

app.listen(process.env.PORT || 3001);