const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ValidationError } = require('../error/ValidationError');


const login = async (username, password, knex) => {
    const dbHash = await knex('app_user').select('password').where('username', username);

    if (!(dbHash && dbHash[0] && dbHash[0].password)) {
        throw new ValidationError('Credentials do not match');
    }

    const match = await bcrypt.compare(password, dbHash[0].password);

    if (!match) {
        throw new ValidationError('Credentials do not match');
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_EXPIRY_SECONDS
    });

    return token;
};


module.exports = {
    login
};