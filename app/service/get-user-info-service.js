const { ValidationError } = require('../error/ValidationError');


const getUserInfo = async (userId, knex) => {
    const getLikesQ = lib._getLikesQ(knex, userId);
    const getUsernameQ = lib._getUsernameQ(knex, userId);

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

function _getLikesQ(knex, userId) {
    return knex('user_like')
        .count('* as total')
        .having('to_user', '=', userId)
        .groupBy('to_user');
}

function _getUsernameQ(knex, userId) {
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