const { knex, app } = require('./config/app-config');

require('./route/public-routes')(knex, app);
require('./route/protected-routes')(knex, app);

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));