const getMostLiked = async (knex) => {
    const likesByUserQ = lib._getLikesByUserQ(knex);
    const mostLikedQ = lib._getMostLikedQ(knex, likesByUserQ);

    return await mostLikedQ;
};

function _getLikesByUserQ(knex) {
    return knex('user_like')
        .select('to_user')
        .count('* as total')
        .groupBy('to_user')
        .as('q');
}

function _getMostLikedQ(knex, likesByUserQ) {
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