const { isAuthorized } = require('../service/auth-service');


module.exports = function (req, res, next) {
    const token = req.cookies.token;

    if (isAuthorized(token)) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};