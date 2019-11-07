const container = require('../../../app/ioc/container');

test('unlikeUser should return confirmation if query was executed successfully', async () => {
    container.likesRepo = {};
    container.likesRepo.getDeleteQ = jest.fn();

    const unlikeUser = require('../../../app/service/unlike-user-service');

    const result = await unlikeUser.unlikeUser(1,2,undefined);
    expect(result).toEqual({
        from: 1,
        to: 2,
        state: 'successful'
    });

    expect(container.likesRepo.getDeleteQ).toHaveBeenCalledTimes(1);
});