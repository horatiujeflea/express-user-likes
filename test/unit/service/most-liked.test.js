const container = require('../../../app/ioc/container');

test('mostLikes should execute all queries', async () => {
    container.userRepo = {};
    container.userRepo.getMostLikedQ = jest.fn(() => 'result');

    const mostLiked = require('../../../app/service/most-liked-service');

    const result = await mostLiked.getMostLiked();
    expect(result).toEqual('result');

    expect(container.userRepo.getMostLikedQ).toHaveBeenCalledTimes(1);
});