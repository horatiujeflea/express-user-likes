const mostLiked = require('../../../app/service/mostLiked');

test('mostLikes should execute all queries', async () => {
    mostLiked._getLikesByUserQ = jest.fn(() => "partial_query");
    mostLiked._getMostLikedQ = jest.fn(() => 'result');

    const result = await mostLiked.getMostLiked();
    expect(result).toEqual('result');

    expect(mostLiked._getLikesByUserQ).toHaveBeenCalledTimes(1);
    expect(mostLiked._getMostLikedQ).toHaveBeenCalledTimes(1);
});