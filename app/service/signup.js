const bcrypt = require('bcryptjs');

const saltRounds = 10;

const { ValidationError } = require('../error/ValidationError');


const signUp = async (username, password, knex) => {
    if (!validateUsername(username)) {
        throw new ValidationError('Username is not correct (specify requirements...)');
    }

    if (!validatePassword(username)) {
        throw new ValidationError('Password is not correct (specify requirements...)');
    }

    const hash = await bcrypt.hash(password, saltRounds);

    try {
        const insertQ = knex('app_user')
            .insert([{username: username, password: hash}]);
        await insertQ;
    } catch (e) {
        switch (e.constraint) {
            case 'app_user_username_key':
                throw new ValidationError('Username is already taken');
            default:
                throw new Error(e);
        }
    }

    // const match = await bcrypt.compare(password, hash);
};

const validateUsername = (username) => {
    // implement requirements
    return true;
};

const validatePassword = (password) => {
    // implement requirements
    return true;
};

module.exports = {
    signUp
};