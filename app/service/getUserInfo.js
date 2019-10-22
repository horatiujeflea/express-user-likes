let { ValidationError } = require('../error/ValidationError');

const getUserInfo = async (userId, knex) => {
    const getLikesQ = knex('user_like')
        .count('* as total')
        .having('to_user', '=', userId)
        .groupBy('to_user');

    const getUsernameQ = knex('app_user')
        .select('username')
        .where('id', userId);

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

module.exports = {
    getUserInfo
};