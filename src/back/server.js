require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true
    })
    .then(()=>{
        console.log('DB connected');
    });

morgan.token("data", (req) => {
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :data', {
    skip: function (req, res) { return req.method !== "POST" }
}));

app.use('/', router);

app.use(errorHandler);

