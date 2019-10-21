require('dotenv').config();

const { getStatus } = require('./service/status');

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/status', function (req, res) {
    res.send(getStatus());
});

app.listen(port, () => console.log(`User likes app listening on port ${port}!`));