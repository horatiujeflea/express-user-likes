const container = require('../../../app/ioc/container');
container.userRepo = {};

test('mostLikes should execute all queries', async () => {
    container.userRepo.getMostLikedQ = jest.fn(() => 'result');

    const mostLiked = require('../../../app/service/most-liked-service');

    const result = await mostLiked.getMostLiked();
    expect(result).toEqual('result');

    expect(container.userRepo.getMostLikedQ).toHaveBeenCalledTimes(1);
});