const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

morgan.token("data", (req) => {
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :data', {
    skip: function (req, res) { return req.method !== "POST" }
}));

app.use('/', router);

