const { knex, app } = require('./config/appconfig');
const { getStatus } = require('./service/status');

app.get('/', (req, res) => {
    const showdown = require('showdown');
    const fs = require('fs');
    const path = require('path');

    const readmeFile = fs.readFileSync(path.join(__dirname+ '/../README.md'), 'utf8');
    const readmeText = readmeFile.toString();
    const converter = new showdown.Converter();
    const readmeHtml = converter.makeHtml(readmeText);

    res.send(readmeHtml);
});

app.get('/status', function (req, res) {
    res.send(getStatus());
});

app.get('/users', async function (req, res) {
    let queryBuilder = await knex('account').select('*');
    res.send(queryBuilder[1]);
});
