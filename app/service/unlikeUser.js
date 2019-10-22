const unlikeUser = async (loggedInUserId, userId, knex) => {
    let toUserId = parseInt(userId);

    const deleteQ = knex('user_like')
        .where('from_user', loggedInUserId)
        .andWhere('to_user', toUserId)
        .del();
    await deleteQ;

    return {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };
};

module.exports = {
    unlikeUser
};

