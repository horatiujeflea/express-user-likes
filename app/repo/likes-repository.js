const container = require('../ioc/container');
const knex = container.knex;

function getLikesCountQ(userId) {
    return knex('user_like')
        .count('* as total')
        .having('to_user', '=', userId)
        .groupBy('to_user');
}

function getInsertQ(loggedInUserId, toUserId) {
    return knex('user_like')
        .insert([{from_user: loggedInUserId, to_user: toUserId}]);
}

function getDeleteQ(loggedInUserId, toUserId) {
    return knex('user_like')
        .where('from_user', loggedInUserId)
        .andWhere('to_user', toUserId)
        .del();
}

module.exports = {
    getLikesCountQ,
    getInsertQ,
    getDeleteQ
};