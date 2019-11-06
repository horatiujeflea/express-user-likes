const container = require('../ioc/container');
const knex = container.knex;

const unlikeUser = async (loggedInUserId, userId) => {
    let toUserId = parseInt(userId);

    const deleteQ = lib._getDeleteQ(loggedInUserId, toUserId);
    await deleteQ;

    return {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };
};

function _getDeleteQ(loggedInUserId, toUserId) {
    return knex('user_like')
        .where('from_user', loggedInUserId)
        .andWhere('to_user', toUserId)
        .del();
}

const lib = {
    unlikeUser,
    _getDeleteQ
};

module.exports = lib;

