const container = require('../ioc/container');
const knex = container.knex;

function getUsernameByIdQ(userId) {
    return knex('app_user')
        .select('username')
        .where('id', userId);
}

function getUserDataByUsernameQ(username) {
    return knex('app_user').select('id', 'password').where('username', username);
}

function getInsertUserQ(username, hash) {
    return knex('app_user')
        .insert([{username: username, password: hash}]);
}

function getMostLikedQ() {
    const likesByUserQ = knex('user_like')
        .select('to_user')
        .count('* as total')
        .groupBy('to_user')
        .as('q');

    return knex('app_user AS au')
        .select('q.to_user AS user_id', 'au.username', 'q.total')
        .innerJoin(likesByUserQ, "au.id", "q.to_user")
        .orderBy('q.total', 'DESC')
        .limit(100);
}

function updatePassword(hash) {
    return knex('app_user').update('password', hash)
}

module.exports = {
    getUsernameByIdQ,
    getUserDataByUsernameQ,
    getInsertUserQ,
    getMostLikedQ,
    updatePassword
};