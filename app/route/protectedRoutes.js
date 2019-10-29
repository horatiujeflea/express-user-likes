const { sendError } = require('../util/httpUtil');

const { likeUser } = require('../service/likeUser');
const { unlikeUser } = require('../service/unlikeUser');
const { changePassword } = require('../service/registration');
const { getUsernameFromToken, getUserIdFromToken } = require('../service/auth');

const requiresLogin = require('./requiresLoginMiddleware');

const lib = (knex, app) => {
    app.get('/me', requiresLogin, async function (req, res) {
        try {
            const token = req.cookies.token;
            res.json({
                "username": getUsernameFromToken(token)
            });
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.put('/me/update-password', requiresLogin, async function (req, res) {
        try {
            const password = req.body.password;
            const token = req.cookies.token;
            await changePassword(getUsernameFromToken(token), password, knex);
            res.send('Successful');
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.put('/user/:id/like', requiresLogin, async function (req, res) {
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

    app.delete('/user/:id/unlike', requiresLogin, async function (req, res) {
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
};

module.exports = lib;