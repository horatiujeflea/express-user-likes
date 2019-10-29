const { sendError } = require('../util/httpUtil');

const { getReadmeHtml } = require('../service/readme');
const { getStatus } = require('../service/status');
const { getMostLiked } = require('../service/mostLiked');
const { getUserInfo } = require('../service/getUserInfo');
const { login } = require('../service/login');
const { signUp } = require('../service/registration');

const lib = (knex, app) => {
    app.get('/', (req, res) => {
        try {
            res.send(getReadmeHtml());
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.get('/status', function (req, res) {
        try {
            res.json(getStatus());
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.post('/signup', async function (req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            res.json(await signUp(username, password, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.post('/login', async function (req, res) {
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
    });

    app.get('/most-liked', async function (req, res) {
        try {
            res.json(await getMostLiked(knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });

    app.get('/user/:id/', async function (req, res) {
        try {
            const userId = req.params.id;
            res.json(await getUserInfo(userId, knex));
        } catch (e) {
            console.error(e);
            sendError(res)(e);
        }
    });
};

module.exports = lib;