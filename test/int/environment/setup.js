console.log("*** SETTING UP ***");

// create a new schema from db/schema.sql
// run db/db-data/int/data.sql

require('dotenv').config();
const supertest = require('supertest');

const request = supertest(`http://localhost:${process.env.PORT}`);

console.log("*** FINISHED SETTING UP ***");

module.exports = {
    request
};