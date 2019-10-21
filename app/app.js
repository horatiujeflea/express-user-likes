require('dotenv').config();

const { getStatus } = require('./service/status');

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/status', function (req, res) {
    res.send(getStatus());
});

app.get('/users', async function (req, res) {
    const knex = require('knex')({
        client: 'pg',
        version: '11.5',
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_DATABASE
        }
    });

    let queryBuilder = await knex('account').select('*');
    console.log(queryBuilder[1]);

    res.send('done');

});

app.listen(port, () => console.log(`User likes app listening on port ${port}!`));