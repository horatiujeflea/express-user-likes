const { knex, app } = require('./config/app-config');

const routes = require('./route')(knex);
app.use(routes);

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));