const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const ErrorHandler = require(`${__dirname}/ErrorHandlers/generalErrors`);
const personsRouter = require(`${__dirname}/Routers/apiPersons`);
const Person = require(`${__dirname}/Models/Person`);
const app = express();
const port = process.env.PORT || 8080;


// for DEV
// const MongoPassword = process.argv[2];
// const MongoServerURL = `mongodb+srv://elaygelbart:${MongoPassword}@elaygelbart.qhmbq.mongodb.net/ElayGelbart?retryWrites=true&w=majority`;

const MongoServerURL = process.env.MONGO_URL;

mongoose.connect(MongoServerURL);

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/", express.static(`${__dirname}/../Front`));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../Front/index.html`);
});

app.use("/api/persons", personsRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});