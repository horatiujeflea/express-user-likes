const express = require('express');

const { sendError } = require('../util/http-util');

const { changePassword } = require('../service/registration-service');
const { getUsernameFromToken } = require('../service/auth-service');
const { getReadmeHtml } = require('../service/readme-service');
const { getStatus } = require('../service/status-service');
const { login } = require('../service/login-service');
const { signUp } = require('../service/registration-service');

const requiresLogin = require('../middleware/requires-login-middleware');


const router = express.Router();

router.get('/', defaultRoute);
router.get('/status', statusRoute);
router.post('/signup', signupRoute);
router.post('/login', loginRoute);
router.get('/me', requiresLogin, meRoute);
router.put('/me/update-password', requiresLogin, updatePasswordRoute);

function defaultRoute(req, res) {
    try {
        res.send(getReadmeHtml());
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

function statusRoute(req, res) {
    try {
        res.json(getStatus());
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}


async function signupRoute(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        res.json(await signUp(username, password));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function loginRoute(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const token = await login(username, password);

        res.cookie('token', token, {maxAge: process.env.JWT_EXPIRY_SECONDS * 1000});
        res.json({
            username,
            status: "successful"
        });
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function meRoute(req, res) {
    try {
        const token = req.cookies.token;
        res.json({
            "username": getUsernameFromToken(token)
        });
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

async function updatePasswordRoute(req, res) {
    try {
        const password = req.body.password;
        const token = req.cookies.token;
        await changePassword(getUsernameFromToken(token), password);
        res.send('Successful');
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
}

module.exports = router;