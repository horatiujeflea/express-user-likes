const { knex, app } = require('./config/appConfig');

const { sendError } = require('./util/httpUtil');

const { getReadmeHtml } = require('./service/readme');
const { getStatus } = require('./service/status');
const { getMostLiked } = require('./service/mostLiked');
const { getUserInfo } = require('./service/getUserInfo');
const { likeUser } = require('./service/likeUser');
const { unlikeUser } = require('./service/unlikeUser');


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
        res.send(getStatus());
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

app.put('/user/:id/like', async function (req, res) {
    try {
        const userId = req.params.id;
        res.json(await likeUser(userId, knex));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.delete('/user/:id/unlike', async function (req, res) {
    try {
        const userId = req.params.id;
        res.json(await unlikeUser(userId, knex));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));