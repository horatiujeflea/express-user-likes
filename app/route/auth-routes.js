const express = require('express');

const { sendError } = require('../util/http-util');

const { changePassword } = require('../service/registration');
const { getUsernameFromToken } = require('../service/auth');
const { getReadmeHtml } = require('../service/readme');
const { getStatus } = require('../service/status');
const { login } = require('../service/login');
const { signUp } = require('../service/registration');

const requiresLogin = require('../middleware/requires-login-middleware');


const generateRoutes = (knex) => {
    const router = express.Router();

    router.get('/', defaultRoute());
    router.get('/status', statusRoute());
    router.post('/signup', signupRoute(knex));
    router.post('/login', loginRoute(knex));
    router.get('/me', requiresLogin, meRoute());
    router.put('/me/update-password', requiresLogin, updatePasswordRoute(knex));

    return router;
};

const defaultRoute = () => {
    return (req, res) => {
        try {
            res.send(getReadmeHtml());
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

const statusRoute = () => {
    return function (req, res) {
        try {
            res.json(getStatus());
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

const signupRoute = (knex) => {
    return async function (req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            res.json(await signUp(username, password, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

const loginRoute = (knex) => {
    return async function (req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const token = await login(username, password, knex);

            res.cookie('token', token, {maxAge: process.env.JWT_EXPIRY_SECONDS * 1000});
            res.json({
                username,
                status: "successful"
            });
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

const meRoute = () => {
    return async function (req, res) {
        try {
            const token = req.cookies.token;
            res.json({
                "username": getUsernameFromToken(token)
            });
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

const updatePasswordRoute = (knex) => {
    return async function (req, res) {
        try {
            const password = req.body.password;
            const token = req.cookies.token;
            await changePassword(getUsernameFromToken(token), password, knex);
            res.send('Successful');
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    };
};

module.exports = (knex) => {
    return generateRoutes(knex);
};