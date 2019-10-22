let { ValidationError } = require('../error/ValidationError');

const sendError = (res, status, message) => error => {
    res.status(status || (error instanceof ValidationError ? 400 : 500)).json({
        type: 'error',
        message: message || error.message,
        error
    })
};

module.exports = {
    sendError
};