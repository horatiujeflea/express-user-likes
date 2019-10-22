const getMostLiked = (knex) => {
    const likesByUserQ = knex('user_like')
        .select('to_user')
        .count('* as total')
        .groupBy('to_user')
        .as('q');

    const mostLikedQ = knex.select('q.to_user AS user_id', 'au.username', 'q.total')
        .from("app_user AS au")
        .innerJoin(likesByUserQ, "au.id", "q.to_user")
        .orderBy('q.total', 'DESC')
        .limit(100);

    return mostLikedQ;
};

module.exports = {
    getMostLiked
};