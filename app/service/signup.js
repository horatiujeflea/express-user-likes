const bcrypt = require('bcryptjs');

const saltRounds = 10;

const { ValidationError } = require('../error/ValidationError');


const signUp = async (username, password, knex) => {
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

module.exports = {
    signUp
};