const packageJson = require('../../package');

const getStatus = () => {
    return {
        version: packageJson.version,
        status: "up"
    };
};

module.exports = {
    getStatus
};