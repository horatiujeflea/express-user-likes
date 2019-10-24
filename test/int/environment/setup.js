require('dotenv').config();
const supertest = require('supertest');

// require('../../../app/app');

const request = supertest(`http://localhost:${process.env.PORT}`);

module.exports = {
    request
};

console.log("*** SETTING UP ***");

// create a new schema from db/schema.sql
// run db/db-data/int/data.sql