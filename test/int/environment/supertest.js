require('dotenv').config();
const supertest = require('supertest');

const request = supertest(`http://localhost:${process.env.PORT}`);

module.exports = {
    request
};