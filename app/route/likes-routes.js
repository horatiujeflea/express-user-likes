const express = require('express');

const { sendError } = require('../util/http-util');

const { getMostLiked } = require('../service/most-liked-service');
const { getUserInfo } = require('../service/get-user-info-service');
const { likeUser } = require('../service/like-user-service');
const { unlikeUser } = require('../service/unlike-user-service');
const { getUserIdFromToken } = require('../service/auth-service');

const requiresLogin = require('../middleware/requires-login-middleware');


const router = express.Router();

router.get('/most-liked', mostLikedRoute);
router.get('/user/:id/', userInfoRoute);
router.put('/user/:id/like', requiresLogin, likeRoute);
router.delete('/user/:id/unlike', requiresLogin, unlikeRoute);

async function mostLikedRoute(req, res) {
    try {
        res.json(await getMostLiked());
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function userInfoRoute(req, res) {
    try {
        const userId = req.params.id;
        res.json(await getUserInfo(userId));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function likeRoute(req, res) {
    try {
        const token = req.cookies.token;
        const userId = req.params.id;
        const loggedInUser = parseInt(getUserIdFromToken(token));
        res.json(await likeUser(loggedInUser, userId));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function unlikeRoute(req, res) {
    try {
        const token = req.cookies.token;
        const userId = req.params.id;
        const loggedInUser = parseInt(getUserIdFromToken(token));
        res.json(await unlikeUser(loggedInUser, userId));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

module.exports = router;