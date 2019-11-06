const container = require('../ioc/container');
const knex = container.knex;

const getMostLiked = async () => {
    const likesByUserQ = lib._getLikesByUserQ();
    const mostLikedQ = lib._getMostLikedQ(likesByUserQ);

    return await mostLikedQ;
};

function _getLikesByUserQ() {
    return knex('user_like')
        .select('to_user')
        .count('* as total')
        .groupBy('to_user')
        .as('q');
}

function _getMostLikedQ(likesByUserQ) {
    return knex('app_user AS au')
        .select('q.to_user AS user_id', 'au.username', 'q.total')
        .innerJoin(likesByUserQ, "au.id", "q.to_user")
        .orderBy('q.total', 'DESC')
        .limit(100);
}

const lib = {
    getMostLiked,
    _getLikesByUserQ,
    _getMostLikedQ
};

module.exports = lib;