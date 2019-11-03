const getUserInfo = require('../../../app/service/get-user-info');

test('getUserInfo should return total likes and username', async () => {
    getUserInfo._getLikesQ = jest.fn(() => Promise.resolve([{total: 2}]));
    getUserInfo._getUsernameQ = jest.fn(() => Promise.resolve([{username: 'johndoe'}]));

    const result = await getUserInfo.getUserInfo();
    expect(result.username).toEqual('johndoe');
    expect(result.likes).toEqual(2);

    expect(getUserInfo._getLikesQ).toHaveBeenCalledTimes(1);
    expect(getUserInfo._getUsernameQ).toHaveBeenCalledTimes(1);
});