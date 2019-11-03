require('dotenv').config();

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

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());


module.exports = {
    knex,
    app
};