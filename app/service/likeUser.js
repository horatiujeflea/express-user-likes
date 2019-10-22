let { ValidationError } = require('../error/ValidationError');

const likeUser = async (userId, knex) => {
    let loggedInUserId = 1;

    let insertQ = knex('user_like')
        .insert([{from_user: loggedInUserId, to_user: parseInt(userId)}]);
    let insertIgnoreQ = knex.raw(insertQ.toQuery())
        + " ON DUPLICATE KEY DO NOTHING";

    console.log(insertIgnoreQ.toString());
    await insertIgnoreQ;

    return {
        from: loggedInUserId,
        to: userId,
        state: "successful"
    };
};

module.exports = {
    likeUser
};

