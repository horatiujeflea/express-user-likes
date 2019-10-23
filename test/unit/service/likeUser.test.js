const { ValidationError } = require('../../../app/error/ValidationError');

const likeUser = require('../../../app/service/likeUser');

describe("Like User Test", () => {
    test('likeUser with valid parameters should be successful', async () => {
        likeUser._getInsertQ = jest.fn();

        const result = await likeUser.likeUser(1, 2);
        expect(result).toEqual({
            from: 1,
            to: 2,
            state: 'successful'
        });

        expect(likeUser._getInsertQ).toHaveBeenCalledTimes(1);
    });

    test('likeUser should throw proper exceptions based on their constraint', async () => {
        likeUser._getInsertQ = jest.fn((knex, u1, u2) => {
            // user likes himself
            if (u1 === u2) {
                throw {constraint: 'from_user_cannot_be_equal_to_to_user_chk'}
            }
            // user does not exist in DB
            if (u2 > 20) {
                throw {constraint: 'user_like_to_user_fkey'}
            }
            // like already exists in DB
            if (u2 === 19) {
                throw {constraint: 'user_like_pkey'}
            }
        });

        try {
             await likeUser.likeUser(1, 1);
             expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("You cannot like yourself");
        }

        try {
            await likeUser.likeUser(1, 30);
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("User id does not exist");
        }

        await likeUser.likeUser(1, 18);
        await likeUser.likeUser(1, 19);
    });
});