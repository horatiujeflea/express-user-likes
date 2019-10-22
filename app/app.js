const { knex, app } = require('./config/appConfig');

const { sendError } = require('./util/httpUtil');

const { getReadmeHtml } = require('./service/readme');
const { getStatus } = require('./service/status');
const { getMostLiked } = require('./service/mostLiked');
const { getUserInfo } = require('./service/getUserInfo');
const { likeUser } = require('./service/likeUser');
const { unlikeUser } = require('./service/unlikeUser');
const { signUp, changePassword } = require('./service/registration');
const { login } = require('./service/login');
const { isAuthorized, getUsernameFromToken, getUserIdFromToken } = require('./service/auth');


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

app.post('/signup', async function(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        res.json(await signUp(username, password, knex));
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.post('/login', async function(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const token = await login(username, password, knex);

        res.cookie('token', token, { maxAge: process.env.JWT_EXPIRY_SECONDS * 1000 });
        res.json({
            username,
            status: "successful"
        });
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.get('/me', async function (req, res) {
    try {
        const token = req.cookies.token;
        if (isAuthorized(token)) {
            res.json({
                "username": getUsernameFromToken(token)
            });
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.put('/me/update-password', async function (req, res) {
    try {
        const password = req.body.password;
        const token = req.cookies.token;

        if (isAuthorized(token)) {
            await changePassword(getUsernameFromToken(token), password, knex);
            res.send('Successful');
        } else {
            res.status(401).send("Unauthorized");
        }
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
        const token = req.cookies.token;
        const userId = req.params.id;

        if (isAuthorized(token)) {
            const loggedInUser = parseInt(getUserIdFromToken(token));
            res.json(await likeUser(loggedInUser, userId, knex));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.delete('/user/:id/unlike', async function (req, res) {
    try {
        const token = req.cookies.token;
        const userId = req.params.id;

        if (isAuthorized(token)) {
            const loggedInUser = parseInt(getUserIdFromToken(token));
            res.json(await unlikeUser(loggedInUser, userId, knex));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        console.error(e);
        sendError(res)(e);
    }
});

app.listen(process.env.PORT, () => console.log(`User likes app listening on port ${process.env.PORT}!`));