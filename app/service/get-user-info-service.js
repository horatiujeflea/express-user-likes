const { ValidationError } = require('../error/ValidationError');

const container = require('../ioc/container');
const knex = container.knex;


const getUserInfo = async (userId) => {
    const getLikesQ = lib._getLikesQ(userId);
    const getUsernameQ = lib._getUsernameQ(userId);

    const foundUsername = (await getUsernameQ)[0];
    if (!foundUsername) {
        throw new ValidationError("User does not exist");
    }

    const foundLikes = (await getLikesQ)[0];

    return {
        username: foundUsername.username,
        likes: foundLikes && foundLikes.total ? foundLikes.total : 0
    };
};

function _getLikesQ(userId) {
    return knex('user_like')
        .count('* as total')
        .having('to_user', '=', userId)
        .groupBy('to_user');
}

function _getUsernameQ(userId) {
    return knex('app_user')
        .select('username')
        .where('id', userId);
}

const lib = {
    getUserInfo,
    _getLikesQ,
    _getUsernameQ
};

module.exports = lib;