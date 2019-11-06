const bcrypt = require('bcryptjs');

const saltRounds = 10;

const { ValidationError } = require('../error/ValidationError');

const container = require('../ioc/container');
const knex = container.knex;


const signUp = async (username, password) => {
    if (!_validateUsername(username)) {
        throw new ValidationError('Username is not correct (specify requirements...)');
    }

    if (!_validatePassword(password)) {
        throw new ValidationError('Password is not correct (specify requirements...)');
    }

    const hash = await _getHashFromPass(password);

    try {
        const insertQ = lib._getInsertUserQ(username, hash);
        await insertQ;

        return {
            username,
            status: "successful"
        }
    } catch (e) {
        switch (e.constraint) {
            case 'app_user_username_key':
                throw new ValidationError('Username is already taken');
            default:
                throw new Error(e);
        }
    }
};

function _getInsertUserQ(username, hash) {
    return knex('app_user')
        .insert([{username: username, password: hash}]);
}

const changePassword = async (username, password) => {
    if (!_validatePassword(password)) {
        throw new ValidationError('New password is not correct (specify requirements...)');
    }

    const hash = await _getHashFromPass(password);
    await knex('app_user').update('password', hash);
};

const _validateUsername = (username) => {
    // implement requirements
    return true;
};

const _validatePassword = (password) => {
    // implement requirements
    return true;
};

async function _getHashFromPass(password) {
    return await bcrypt.hash(password, saltRounds);
}

const lib = {
    signUp,
    changePassword,
    _getInsertUserQ
};

module.exports = lib;