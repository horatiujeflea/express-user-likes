const { knex, app } = require('./config/appConfig');

require('./route/publicRoutes')(knex, app);
require('./route/protectedRoutes')(knex, app);

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));