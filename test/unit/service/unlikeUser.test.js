const unlikeUser = require('../../../app/service/unlikeUser');

test('unlikeUser should return confirmation if query was executed successfully', async () => {
    unlikeUser._getDeleteQ = jest.fn();

    const result = await unlikeUser.unlikeUser(1,2,undefined);
    expect(result).toEqual({
        from: 1,
        to: 2,
        state: 'successful'
    });

    expect(unlikeUser._getDeleteQ).toHaveBeenCalledTimes(1);
});