const bcrypt = require('bcryptjs');

const saltRounds = 10;

const { ValidationError } = require('../error/ValidationError');


const signUp = async (username, password, knex) => {
    if (!_validateUsername(username)) {
        throw new ValidationError('Username is not correct (specify requirements...)');
    }

    if (!_validatePassword(username)) {
        throw new ValidationError('Password is not correct (specify requirements...)');
    }

    const hash = await _getHashFromPass(password);

    try {
        const insertQ = knex('app_user')
            .insert([{username: username, password: hash}]);
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

const changePassword = async (username, password, knex) => {
    if (!_validatePassword(username)) {
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

module.exports = {
    signUp,
    changePassword
};