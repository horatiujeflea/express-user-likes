const express = require('express');

const generateRoutes = (knex) => {
    const router = express.Router();

    router.use(require('./auth-routes')(knex));
    router.use(require('./likes-routes')(knex));

    return router;
};

module.exports = (knex) => {
    return generateRoutes(knex);
};