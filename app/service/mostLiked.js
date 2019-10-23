const getMostLiked = async (knex) => {
    const likesByUserQ = knex('user_like')
        .select('to_user')
        .count('* as total')
        .groupBy('to_user')
        .as('q');

    const mostLikedQ = knex('app_user AS au')
        .select('q.to_user AS user_id', 'au.username', 'q.total')
        .innerJoin(likesByUserQ, "au.id", "q.to_user")
        .orderBy('q.total', 'DESC')
        .limit(100);

    return await mostLikedQ;
};

module.exports = {
    getMostLiked
};