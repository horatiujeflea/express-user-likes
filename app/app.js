require('dotenv').config();

const container = require('./ioc/container');

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

container.knex = knex;

const express = require('express');
const app = express();

container.app = app;

app.use(express.json());
app.use(require('body-parser').json());
app.use(require('cookie-parser')());
app.use(require('./route'));

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));