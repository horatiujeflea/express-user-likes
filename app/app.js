const { knex, app } = require('./config/appconfig');

const { getReadmeHtml } = require('./service/readme');
const { getStatus } = require('./service/status');
const { getMostLiked } = require('./service/mostLiked');

app.get('/', (req, res) => {
    res.send(getReadmeHtml());
});

app.get('/status', function (req, res) {
    res.send(getStatus());
});

app.get('/most-liked', async function (req, res) {
    res.json(await getMostLiked(knex));
});
