const { isAuthorized } = require('../service/auth');


module.exports = function (req, res, next) {
    const token = req.cookies.token;

    if (isAuthorized(token)) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};