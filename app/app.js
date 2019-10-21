const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/status', function (req, res) {
    const pjson = require('../package.json');
    res.send({
        version: pjson.version,
        status: "up"
    });
});

app.listen(port, () => console.log(`User likes app listening on port ${port}!`));