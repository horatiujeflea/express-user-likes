const { knex, app } = require('./config/appconfig');

const { getReadmeHtml } = require('./service/readme');
const { getStatus } = require('./service/status');
const { getMostLiked } = require('./service/mostLiked');
const { getUserInfo } = require('./service/getUserInfo');

const { sendError } = require('./util/httpUtil');


app.get('/', (req, res) => {
    try {
        res.send(getReadmeHtml());
    } catch (e) {
        // log exception
        sendError(res)(e);
    }
});

app.get('/status', function (req, res) {
    try {
        res.send(getStatus());
    } catch (e) {
        // log exception
        sendError(res)(e);
    }
});

app.get('/most-liked', async function (req, res) {
    try {
        res.json(await getMostLiked(knex));
    } catch (e) {
        // log exception
        sendError(res)(e);
    }
});

app.get('/user/:id/', async function (req, res) {
    try {
        const userId = req.params.id;
        res.json(await getUserInfo(userId, knex));
    } catch (e) {
        // log exception
        sendError(res)(e);
    }
});