const container = require('../../../app/ioc/container');
container.userRepo = {};
container.likesRepo = {};

test('getUserInfo should return total likes and username', async () => {
    container.userRepo.getUsernameByIdQ = jest.fn(() => Promise.resolve([{username: 'johndoe'}]));
    container.likesRepo.getLikesCountQ = jest.fn(() => Promise.resolve([{total: 2}]));

    const getUserInfo = require('../../../app/service/get-user-info-service');

    const result = await getUserInfo.getUserInfo();
    expect(result.username).toEqual('johndoe');
    expect(result.likes).toEqual(2);

    expect(container.userRepo.getUsernameByIdQ).toHaveBeenCalledTimes(1);
    expect(container.likesRepo.getLikesCountQ).toHaveBeenCalledTimes(1);
});