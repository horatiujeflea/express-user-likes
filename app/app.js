const { knex, app } = require('./config/appconfig');
const { getStatus } = require('./service/status');
const { getReadmeHtml } = require('./service/readme');

app.get('/', (req, res) => {
    res.send(getReadmeHtml());
});

app.get('/status', function (req, res) {
    res.send(getStatus());
});

app.get('/users', async function (req, res) {
    let queryBuilder = await knex('account').select('*');
    res.send(queryBuilder[1]);
});
