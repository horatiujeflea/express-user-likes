const unlikeUser = async (loggedInUserId, userId, knex) => {
    let toUserId = parseInt(userId);

    const deleteQ = lib._getDeleteQ(knex, loggedInUserId, toUserId);
    await deleteQ;

    return {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };
};

function _getDeleteQ(knex, loggedInUserId, toUserId) {
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

