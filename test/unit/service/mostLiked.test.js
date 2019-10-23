const { getMostLiked } = require('../../../app/service/mostLiked');

test('mostLikes should return ', () => {
    const mockKnex = () => {
        const q = {
            select: () => q,
            count: () => q,
            groupBy: () => q,
            as: () => q,
            from: () => q,
            innerJoin: () => q,
            orderBy: () => q,
            limit: () => q,
        };

        return q;
    };

    const mostLiked = getMostLiked(mockKnex);


});