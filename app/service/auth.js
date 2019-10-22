const jwt = require('jsonwebtoken');


const isAuthorized = (token) => {
    if (!token) {
        return false;
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return false;
        } else {
            throw new Error(e);
        }
    }
};

const getUsernameFromToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET).username;
};

module.exports = {
    isAuthorized,
    getUsernameFromToken
};