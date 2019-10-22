const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ValidationError } = require('../error/ValidationError');


const login = async (username, password, knex) => {
    const userQ = await knex('app_user').select('id', 'password').where('username', username);

    if (!(userQ && userQ[0] && userQ[0].password)) {
        throw new ValidationError('Credentials do not match');
    }

    const match = await bcrypt.compare(password, userQ[0].password);

    if (!match) {
        throw new ValidationError('Credentials do not match');
    }

    const token = jwt.sign(
        {
            userId: userQ[0].id,
            username
        },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRY_SECONDS
        }
    );

    return token;
};


module.exports = {
    login
};