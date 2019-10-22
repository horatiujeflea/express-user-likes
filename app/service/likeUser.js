let { ValidationError } = require('../error/ValidationError');

const likeUser = async (userId, knex) => {
    let loggedInUserId = 1;
    let toUserId = parseInt(userId);

    let insertQ = knex('user_like')
        .insert([{from_user: loggedInUserId, to_user: toUserId}]);
    let insertIgnoreQ = knex.raw(insertQ.toQuery())
        + " ON DUPLICATE KEY DO NOTHING";

    await insertIgnoreQ;

    return {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };
};

module.exports = {
    likeUser
};

