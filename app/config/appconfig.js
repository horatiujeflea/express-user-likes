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
const port = process.env.PORT;
app.listen(port, () => console.log(`User likes app listening on port ${port}!`));

module.exports = {
    knex,
    app
};