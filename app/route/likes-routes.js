const express = require('express');

const { sendError } = require('../util/http-util');

const { getMostLiked } = require('../service/most-liked');
const { getUserInfo } = require('../service/get-user-info');
const { likeUser } = require('../service/like-user');
const { unlikeUser } = require('../service/unlike-user');

const requiresLogin = require('../middleware/requires-login-middleware');


const generateRoutes = (knex) => {
    const router = express.Router();

    router.get('/most-liked', async function (req, res) {
        try {
            res.json(await getMostLiked(knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    router.get('/user/:id/', async function (req, res) {
        try {
            const userId = req.params.id;
            res.json(await getUserInfo(userId, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    router.put('/user/:id/like', requiresLogin, async function (req, res) {
        try {
            const token = req.cookies.token;
            const userId = req.params.id;
            const loggedInUser = parseInt(getUserIdFromToken(token));
            res.json(await likeUser(loggedInUser, userId, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    router.delete('/user/:id/unlike', requiresLogin, async function (req, res) {
        try {
            const token = req.cookies.token;
            const userId = req.params.id;
            const loggedInUser = parseInt(getUserIdFromToken(token));
            res.json(await unlikeUser(loggedInUser, userId, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });
    return router;
};

module.exports = (knex) => {
    return generateRoutes(knex);
};